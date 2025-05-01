import json
import time
import random
import re
from urllib.parse import urlparse
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from webdriver_manager.chrome import ChromeDriverManager

def initialize_driver(use_proxy=False, proxy=None, user_agent=None):
    """Initialize Chrome WebDriver with appropriate options."""
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in headless mode
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    
    # Add user agent if provided
    if user_agent:
        chrome_options.add_argument(f"user-agent={user_agent}")
        print(f"Using user agent: {user_agent}")
    
    # Add proxy if provided
    if use_proxy and proxy:
        chrome_options.add_argument(f'--proxy-server={proxy}')
        print(f"Using proxy: {proxy}")
    
    # Initialize Chrome WebDriver
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver

def is_direct_image_url(url):
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

def extract_image_url(driver, url, retry_count=0, max_retries=2):
    """Extract the actual image URL from Google Maps image page."""
    
    # Check if the URL is already a direct image URL
    if is_direct_image_url(url):
        print(f"URL already in correct format, skipping extraction: {url}")
        return url
    
    try:
        driver.get(url)
        
        # Wait for the meta tag with the image URL to load
        wait = WebDriverWait(driver, 10)
        meta_tag = wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "meta[itemprop='image']"))
        )
        
        # Extract the content attribute which contains the image URL
        image_url = meta_tag.get_attribute("content")
        print(f"Found image URL: {image_url}")
        return image_url
        
    except TimeoutException:
        print(f"Timeout waiting for meta tag: {url}")
        if retry_count < max_retries:
            print(f"Retrying ({retry_count+1}/{max_retries})...")
            time.sleep(random.uniform(2, 5))  # Random delay before retry
            return extract_image_url(driver, url, retry_count + 1, max_retries)
        return url  # Return original URL if all retries fail
    except Exception as e:
        print(f"Error extracting image URL: {e}")
        if retry_count < max_retries:
            print(f"Retrying ({retry_count+1}/{max_retries})...")
            time.sleep(random.uniform(2, 5))  # Random delay before retry
            return extract_image_url(driver, url, retry_count + 1, max_retries)
        return url  # Return original URL if all retries fail

def main():
    # Sample data - try to load from file specified in command line args or use default
    try:
        import sys
        input_file = sys.argv[1] if len(sys.argv) > 1 else "paste.txt"
        print(f"Loading data from {input_file}")
        with open(input_file, "r") as f:
            data = json.loads(f.read())
    except Exception as e:
        print(f"Error loading input file: {e}")
        return
    
    # User agent rotation
    user_agents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0"
    ]
    
    # Optional: Add your proxy here
    proxy = None  # Example: "http://your-proxy-server:port"
    use_proxy = proxy is not None
    
    # Use a random user agent
    user_agent = random.choice(user_agents)
    
    # Initialize WebDriver
    driver = initialize_driver(use_proxy=use_proxy, proxy=proxy, user_agent=user_agent)
    
    # Cache to avoid duplicate URLs
    url_cache = {}
    
    try:
        # Process the first place (or a specific index if provided)
        place_index = 0
        if len(sys.argv) > 2:
            try:
                place_index = int(sys.argv[2])
                if place_index >= len(data):
                    place_index = 0
            except:
                pass
        
        place = data[place_index]
        place_name = place.get("name", "Unknown")
        print(f"Processing place: {place_name}")
        
        # Create a new place object (shallow copy is fine for this test)
        updated_place = place.copy()
        
        # Parse images array
        try:
            if isinstance(place["images"], str):
                image_urls = json.loads(place["images"])
            else:
                image_urls = place["images"]
        except json.JSONDecodeError:
            print(f"Invalid JSON in images field for {place_name}")
            return
        
        # Process first 3 images as a test
        updated_image_urls = []
        for i, url in enumerate(image_urls[:3]):
            print(f"\nProcessing image {i+1}/3")
            
            # Check if URL is in cache
            if url in url_cache:
                print(f"URL already in cache: {url}")
                actual_url = url_cache[url]
            else:
                # Extract the actual image URL
                actual_url = extract_image_url(driver, url)
                # Store in cache
                url_cache[url] = actual_url
            
            # Only add if not already in updated list
            if actual_url and actual_url not in updated_image_urls:
                updated_image_urls.append(actual_url)
            else:
                # Keep original URL if extraction failed or would result in duplicate
                if url not in updated_image_urls:
                    updated_image_urls.append(url)
            
            # Add a small delay between requests
            delay = random.uniform(2, 4)
            print(f"Waiting {delay:.2f} seconds before next request...")
            time.sleep(delay)
        
        # Add remaining original URLs (avoiding duplicates)
        if len(image_urls) > 3:
            for i in range(3, len(image_urls)):
                if image_urls[i] not in updated_image_urls:
                    updated_image_urls.append(image_urls[i])
        
        # Update the new place object with updated image URLs
        updated_place["images"] = json.dumps(updated_image_urls)
        
        # Print results
        print("\nOriginal URLs:")
        for url in image_urls[:3]:
            print(f"- {url}")
            
        print("\nUpdated URLs:")
        for url in json.loads(updated_place["images"])[:3]:
            print(f"- {url}")
            
        # Show if URL format was already correct
        print("\nURL Format Analysis:")
        for url in image_urls[:3]:
            is_direct = is_direct_image_url(url)
            print(f"- {url}")
            print(f"  Already direct image URL: {'Yes' if is_direct else 'No'}")
        
        # Save to a test output file
        output_file = f"test_output_{place_index}.json"
        with open(output_file, "w") as f:
            json.dump([updated_place], f, indent=2)
        print(f"\nSaved updated data to {output_file}")
            
    finally:
        driver.quit()
        print("WebDriver closed")

if __name__ == "__main__":
    main()