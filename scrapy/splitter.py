import csv
import os
import math

def split_csv(input_file, output_prefix, rows_per_file=1000):
    """
    Split a large CSV file into smaller files with a specified number of rows per file.
    
    Args:
        input_file (str): Path to the input CSV file
        output_prefix (str): Prefix for the output CSV files
        rows_per_file (int): Number of rows per output file
    """
    # Get the total number of rows to estimate the number of output files
    with open(input_file, 'r', newline='', encoding='utf-8') as f:
        reader = csv.reader(f)
        header = next(reader)  # Get the header row
        
        # Count the total number of rows
        print("Counting total rows (this might take a while for large files)...")
        row_count = sum(1 for _ in reader)
        print(f"Total rows: {row_count}")
    
    # Calculate the number of output files
    num_files = math.ceil(row_count / rows_per_file)
    print(f"Will create {num_files} output files with up to {rows_per_file} rows each")
    
    # Create output directory if it doesn't exist
    output_dir = 'split_csv_output'
    os.makedirs(output_dir, exist_ok=True)
    
    # Read the file again and split it
    with open(input_file, 'r', newline='', encoding='utf-8') as f:
        reader = csv.reader(f)
        header = next(reader)  # Get the header row again
        
        for file_num in range(num_files):
            output_file = os.path.join(output_dir, f"{output_prefix}_{file_num+1}.csv")
            print(f"Creating file {file_num+1}/{num_files}: {output_file}")
            
            with open(output_file, 'w', newline='', encoding='utf-8') as out_f:
                writer = csv.writer(out_f)
                writer.writerow(header)  # Write the header row
                
                # Write the next batch of rows
                for _ in range(rows_per_file):
                    try:
                        row = next(reader)
                        writer.writerow(row)
                    except StopIteration:
                        # No more rows to read
                        break
    
    print(f"Done! Split into {num_files} files in the '{output_dir}' directory.")

if __name__ == "__main__":
    # Set your input file and output prefix here
    input_file = "bangalore_places_data_2.csv"
    output_prefix = "bangalore_dt"
    
    # Split the CSV file
    split_csv(input_file, output_prefix, 1000)