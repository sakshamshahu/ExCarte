import pandas as pd
import json

# Load the CSV
df = pd.read_csv("BLR.csv")

# Convert rows to a list of dictionaries
data = df.to_dict(orient="records")

# Optionally: save to a JSON file
with open("output.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

# Preview output
print(json.dumps(data[:2], indent=4))  # Display first 2 entries
