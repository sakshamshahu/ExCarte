import json
import time
import random
import logging
import os
from pathlib import Path
from tqdm import tqdm
import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager
import concurrent.futures
import re
from urllib.parse import urlparse

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("image_scraper.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger()

class GoogleMapsImageScraper:
    def __init__(self, input_file, output_file, batch_size=20, delay_min=2, delay_max=5, 
                max_retries=3, checkpoint_frequency=10, max_workers=4,
                proxy_list=None, rotate_user_agents=True):
        """
        Initialize the scraper with configuration parameters.
        
        Args:
            input_file: Path to input JSON file
            output_file: Path to output JSON file
            batch_size: Number of places to process before taking a longer break
            delay_min: Minimum delay in seconds between requests
            delay_max: Maximum delay in seconds between requests
            max_retries: Maximum number of retry attempts for failed requests
            checkpoint_frequency: How often to save progress (number of places)
            max_workers: Maximum number of concurrent workers for parallel processing
            proxy_list: List of proxy servers to rotate through
            rotate_user_agents: Whether to rotate user agents
        """
        self.input_file = input_file
        self.output_file = output_file
        self.batch_size = batch_size
        self.delay_min = delay_min
        self.delay_max = delay_max
        self.max_retries = max_retries
        self.checkpoint_frequency = checkpoint_frequency
        self.checkpoint_file = f"{Path(output_file).stem}_checkpoint.json"
        self.driver = None
        self.data = None
        self.places_processed = 0
        self.max_workers = max_workers
        
        # Proxy rotation
        self.proxy_list = proxy_list or []
        self.current_proxy_index = 0
        
        # User agent rotation
        self.rotate_user_agents = rotate_user_agents
        self.user_agents = [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36"
        ]
        
        # Processed URL cache to avoid re-processing the same URLs
        self.url_cache = {}
        
        # Keep track of failed requests to specific hosts
        self.failed_hosts = {}
        self.max_failures_per_host = 10
        
        # Track when we last restarted the driver
        self.driver_requests = 0
        self.max_driver_requests = 100  # Restart driver after this many requests
        
    def get_next_proxy(self):
        """Get the next proxy in the rotation."""
        if not self.proxy_list:
            return None
            
        proxy = self.proxy_list[self.current_proxy_index]
        self.current_proxy_index = (self.current_proxy_index + 1) % len(self.proxy_list)
        return proxy
        
    def get_random_user_agent(self):
        """Get a random user agent from the list."""
        return random.choice(self.user_agents)
        
    def initialize_driver(self):
        """Initialize the Chrome WebDriver with appropriate options."""
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # Run in headless mode
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--window-size=1920,1080")
        
        # Add random user agent if rotation is enabled
        if self.rotate_user_agents:
            user_agent = self.get_random_user_agent()
            chrome_options.add_argument(f"user-agent={user_agent}")
            logger.info(f"Using user agent: {user_agent}")
        
        # Add proxy if available
        proxy = self.get_next_proxy()
        if proxy:
            chrome_options.add_argument(f'--proxy-server={proxy}')
            logger.info(f"Using proxy: {proxy}")
        
        logger.info("Initializing Chrome WebDriver...")
        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service, options=chrome_options)
        self.driver_requests = 0
        logger.info("WebDriver initialized successfully")
    
    def restart_driver(self):
        """Restart the WebDriver to avoid memory leaks and detection."""
        if self.driver:
            self.driver.quit()
        time.sleep(random.uniform(2, 5))  # Wait before restarting
        self.initialize_driver()
    
    def load_data(self):
        """Load data from input file or checkpoint if available."""
        # Check if checkpoint exists
        checkpoint_path = Path(self.checkpoint_file)
        if checkpoint_path.exists():
            try:
                logger.info(f"Loading checkpoint from {self.checkpoint_file}")
                with open(self.checkpoint_file, 'r', encoding='utf-8') as f:
                    self.data = json.load(f)
                
                # Track how many places we've already processed
                self.places_processed = len(self.data)
                logger.info(f"Resuming from checkpoint with {self.places_processed} places already processed")
                return
            except Exception as e:
                logger.error(f"Error loading checkpoint: {e}")
                logger.info("Falling back to original input file")
        
        # Load original input file
        logger.info(f"Loading data from {self.input_file}")
        try:
            with open(self.input_file, 'r', encoding='utf-8') as f:
                self.data = json.load(f)
        except Exception as e:
            logger.error(f"Error loading input file: {e}")
            raise
    
    def save_checkpoint(self):
        """Save current progress to checkpoint file."""
        logger.info(f"Saving checkpoint to {self.checkpoint_file}")
        with open(self.checkpoint_file, 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)
    
    def save_output(self):
        """Save final processed data to output file."""
        logger.info(f"Saving processed data to {self.output_file}")
        with open(self.output_file, 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)
    
    def is_direct_image_url(self, url):
        """
        Check if the URL is already a direct image URL.
        
        Args:
            url: URL to check
            
        Returns:
            Boolean indicating if it's already a direct image URL
        """
        # Check if URL matches the pattern of extracted Google image URLs
        if re.search(r'googleusercontent\.com.*\.(jpg|jpeg|png|gif|webp)', url, re.IGNORECASE):
            return True
        
        # Check common image URL patterns from Google Maps
        if 'lh3.googleusercontent.com/gps-cs' in url and 'itemprop="image"' not in url:
            return True
            
        return False
    
    def extract_host(self, url):
        """Extract the hostname from a URL."""
        try:
            parsed_url = urlparse(url)
            return parsed_url.netloc
        except:
            return url
    
    def should_skip_host(self, url):
        """Check if we should skip a host due to too many failures."""
        host = self.extract_host(url)
        failures = self.failed_hosts.get(host, 0)
        return failures >= self.max_failures_per_host
    
    def record_host_failure(self, url):
        """Record a failure for a particular host."""
        host = self.extract_host(url)
        self.failed_hosts[host] = self.failed_hosts.get(host, 0) + 1
        logger.warning(f"Host {host} failure count: {self.failed_hosts[host]}")
        
    def extract_image_url(self, url, retry_count=0):
        """
        Extract actual image URL from Google Maps image page.
        
        Args:
            url: The Google Maps image URL
            retry_count: Current retry attempt
            
        Returns:
            Actual image URL if found, otherwise None
        """
        # Check if URL is already in cache
        if url in self.url_cache:
            return self.url_cache[url]
        
        # Check if the URL is already a direct image URL
        if self.is_direct_image_url(url):
            self.url_cache[url] = url  # Cache it
            return url
            
        # Check if we've had too many failures with this host
        if self.should_skip_host(url):
            logger.warning(f"Skipping URL due to too many failures with this host: {url}")
            return url  # Return the original URL
        
        # Increment driver request counter and restart if needed
        self.driver_requests += 1
        if self.driver_requests >= self.max_driver_requests:
            logger.info(f"Restarting driver after {self.driver_requests} requests")
            self.restart_driver()
        
        try:
            self.driver.get(url)
            
            # Wait for the meta tag with the image URL to load
            wait = WebDriverWait(self.driver, 10)
            meta_tag = wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "meta[itemprop='image']"))
            )
            
            # Extract the content attribute which contains the image URL
            image_url = meta_tag.get_attribute("content")
            
            # Cache the result
            self.url_cache[url] = image_url
            
            return image_url
            
        except TimeoutException:
            self.record_host_failure(url)
            if retry_count < self.max_retries:
                logger.warning(f"Timeout extracting image URL. Retrying ({retry_count+1}/{self.max_retries})")
                time.sleep(random.uniform(self.delay_min*2, self.delay_max*2))
                return self.extract_image_url(url, retry_count + 1)
            else:
                logger.error(f"Failed to extract image URL after {self.max_retries} attempts: {url}")
                return url  # Return the original URL on failure
                
        except Exception as e:
            self.record_host_failure(url)
            logger.error(f"Error extracting image URL: {e}")
            if retry_count < self.max_retries:
                logger.info(f"Retrying ({retry_count+1}/{self.max_retries})")
                time.sleep(random.uniform(self.delay_min*2, self.delay_max*2))
                return self.extract_image_url(url, retry_count + 1)
            return url  # Return the original URL on failure
    
    def process_place(self, place):
        """
        Process a single place entry to update its image URLs.
        Only process until one good image URL is found.
        
        Args:
            place: Dictionary containing place data
            
        Returns:
            A copy of the place dictionary with updated image URLs
        """
        # Create a deep copy of the place to avoid modifying the original
        updated_place = place.copy()
        
        if 'images' not in place or not place['images']:
            logger.warning(f"No images found for place {place.get('name', 'Unknown')}")
            return updated_place
        
        try:
            # Parse the images array from string if it's a string
            if isinstance(place['images'], str):
                try:
                    image_urls = json.loads(place['images'])
                except json.JSONDecodeError:
                    logger.error(f"Invalid JSON in images field for {place.get('name', 'Unknown')}")
                    return updated_place
            else:
                image_urls = place['images']
            
            # Initialize a new list for updated image URLs
            updated_image_urls = []
            found_good_image = False
            
            # Check all URLs first to see if any are already in direct format
            for url in image_urls:
                if self.is_direct_image_url(url):
                    logger.info(f"Found URL already in correct format: {url}")
                    updated_image_urls = [url]  # Just use this one URL
                    found_good_image = True
                    break
            
            # If no direct URLs found, try to extract one good URL
            if not found_good_image:
                # Try URLs one by one until we get a good one
                for i, url in enumerate(image_urls):
                    logger.info(f"Processing image {i+1}/{len(image_urls)} for {place.get('name', 'Unknown')}")
                    
                    # Extract the actual image URL
                    actual_image_url = self.extract_image_url(url)
                    
                    # If we got a good URL, use just this one and stop processing
                    if actual_image_url and actual_image_url != url:
                        logger.info(f"Found good image URL. Stopping processing for this place.")
                        updated_image_urls = [actual_image_url]
                        found_good_image = True
                        break
                    
                    # Add delay between requests to avoid being blocked
                    time.sleep(random.uniform(self.delay_min, self.delay_max))
            
            # If no good image was found, use the first original URL
            if not found_good_image and image_urls:
                logger.warning(f"No good image URLs found for {place.get('name', 'Unknown')}. Using first original URL.")
                updated_image_urls = [image_urls[0]]
            
            # Set the updated images in the new place object
            updated_place['images'] = json.dumps(updated_image_urls)
            
            return updated_place
            
        except Exception as e:
            logger.error(f"Error processing place {place.get('name', 'Unknown')}: {e}")
            return updated_place
    
    def run(self):
        """Main method to run the scraper."""
        try:
            self.load_data()
            self.initialize_driver()
            
            # Create a new list for updated places
            updated_data = []
            
            logger.info(f"Processing {len(self.data)} places")
            
            # Create a counter for total places in input data
            total_places = len(self.data)
            
            # Process places with progress bar
            for i, place in enumerate(tqdm(self.data, desc="Processing places")):
                try:
                    # Process the place and get updated version
                    updated_place = self.process_place(place)
                    updated_data.append(updated_place)
                    self.places_processed += 1
                    
                    # Save checkpoint at regular intervals
                    if self.places_processed % self.checkpoint_frequency == 0:
                        # Save the updated data to checkpoint
                        self.data = updated_data
                        self.save_checkpoint()
                    
                    # Take a longer break after each batch
                    if self.places_processed % self.batch_size == 0:
                        logger.info(f"Processed {self.places_processed}/{total_places} places. Taking a longer break...")
                        time.sleep(random.uniform(15, 30))  # Take a longer break after each batch
                        
                        # Also restart the driver to avoid detection
                        self.restart_driver()
                        
                except Exception as e:
                    logger.error(f"Error processing place at index {i}: {e}")
                    # Add the original place to maintain data integrity
                    updated_data.append(place)
            
            # Update the data with all processed places
            self.data = updated_data
            
            # Save final output
            self.save_output()
            logger.info(f"Completed processing {self.places_processed} places")
            
        except Exception as e:
            logger.error(f"An error occurred during execution: {e}")
        finally:
            if self.driver:
                self.driver.quit()
                logger.info("WebDriver closed")

def main():
    # Configuration
    input_file = "places_data.json"  # Path to your input JSON file
    output_file = "places_data_with_images.json"  # Path to save output
    
    # Optional proxy list (add your proxies here if available)
    proxy_list = [
        "156.228.175.44:3128",
        "156.248.82.134:3128",
        "154.213.163.8:3128",
        "156.228.99.107:3128",
        "154.213.164.158:3128",
        "156.242.43.187:3128",
        "156.233.92.206:3128",
        "156.248.87.40:3128",
        "156.228.79.206:3128",
        "156.233.73.187:3128",
        "156.249.137.55:3128",
        "156.228.174.232:3128",
        "156.228.104.165:3128",
        "156.242.42.140:3128",
        "156.242.34.22:3128",
        "156.228.176.83:3128",
        "156.242.45.203:3128",
        "156.228.87.148:3128",
        "156.228.78.59:3128",
        "156.228.178.5:3128",
        "156.233.86.69:3128",
        "156.228.171.3:3128",
        "156.253.178.10:3128",
        "156.233.85.108:3128",
        "45.202.79.11:3128",
        "156.228.76.21:3128",
        "156.228.174.238:3128",
        "45.202.77.132:3128",
        "156.228.83.234:3128",
        "154.213.165.98:3128",
        "154.94.13.131:3128",
        "156.228.112.138:3128",
        "156.248.82.153:3128",
        "156.253.174.72:3128",
        "156.228.112.188:3128",
        "156.233.72.212:3128",
        "154.213.197.117:3128",
        "154.213.202.210:3128",
        "156.242.37.15:3128",
        "156.253.177.96:3128",
        "156.228.119.5:3128",
        "156.228.179.102:3128",
        "156.233.88.196:3128",
        "156.228.85.5:3128",
        "154.213.166.18:3128",
        "156.253.176.27:3128",
        "156.228.112.39:3128",
        "156.253.176.43:3128",
        "156.233.88.247:3128",
        "156.228.114.82:3128",
        "154.213.166.87:3128",
        "156.242.46.225:3128",
        "156.228.110.207:3128",
        "156.228.92.173:3128",
        "156.242.35.218:3128",
        "154.213.167.61:3128",
        "156.228.90.119:3128",
        "154.213.161.103:3128",
        "156.228.118.150:3128",
        "156.228.177.198:3128",
        "156.242.36.32:3128",
        "156.228.174.222:3128",
        "156.228.179.158:3128",
        "154.94.14.49:3128",
        "156.228.117.241:3128",
        "156.242.37.99:3128",
        "156.228.107.225:3128",
        "156.228.100.0:3128",
        "156.242.39.251:3128",
        "156.228.124.210:3128",
        "156.228.99.241:3128",
        "156.248.80.97:3128",
        "156.253.173.19:3128",
        "156.253.178.232:3128",
        "156.242.35.8:3128",
        "156.233.94.193:3128",
        "156.228.89.114:3128",
        "156.228.99.41:3128",
        "156.228.98.172:3128",
        "156.233.91.215:3128",
        "154.213.163.177:3128",
        "154.213.203.12:3128",
        "156.233.84.223:3128",
        "156.228.108.87:3128",
        "156.248.85.234:3128",
        "156.228.97.216:3128",
        "154.213.193.170:3128",
        "156.228.178.169:3128",
        "156.228.106.143:3128",
        "45.202.78.248:3128",
        "156.228.117.121:3128",
        "154.213.160.144:3128",
        "156.242.45.230:3128",
        "156.228.88.90:3128",
        "156.228.116.48:3128",
        "156.228.117.245:3128",
        "156.253.171.211:3128",
        "154.94.12.235:3128",
        "156.228.117.81:3128",
        "156.233.85.57:3128",
    ]
    # Example: proxy_list = ["http://proxy1:port", "http://proxy2:port"]
    
    # Initialize and run the scraper
    scraper = GoogleMapsImageScraper(
        input_file=input_file,
        output_file=output_file,
        batch_size=30,           # Process 30 places before taking a longer break (increased due to faster processing)
        delay_min=1,             # Minimum delay between requests in seconds (reduced since we make fewer requests)
        delay_max=3,             # Maximum delay between requests in seconds (reduced since we make fewer requests)
        max_retries=2,           # Maximum retry attempts for failed requests
        checkpoint_frequency=20, # Save progress every 20 places (increased due to faster processing)
        max_workers=1,           # Parallel processing (set to 1 for safer operation)
        proxy_list=[],   # List of proxies to rotate through
        rotate_user_agents=True  # Rotate user agents
    )
    
    scraper.run()

if __name__ == "__main__":
    main()
