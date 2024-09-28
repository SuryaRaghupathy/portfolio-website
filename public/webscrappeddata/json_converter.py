import json
import csv

# Provide the full path to the JSON file
json_file_path = 'C:/Users/SuryaRaghupathy/OneDrive - Nurtur Limited/Desktop/Git code import/portfolio-website/public/webscrappeddata/property_data.json'

# Load the JSON data from the file with the correct encoding
with open(json_file_path, 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)

# Open a CSV file to write
csv_file_path = 'C:/Users/SuryaRaghupathy/OneDrive - Nurtur Limited/Desktop/Git code import/portfolio-website/public/webscrappeddata/output.csv'

with open(csv_file_path, 'w', newline='', encoding='utf-8') as csv_file:
    # Create a CSV writer object
    csv_writer = csv.writer(csv_file)

    # Write the header (keys)
    header = data[next(iter(data))].keys()  # To ensure correct extraction of headers
    csv_writer.writerow(header)

    # Write the data (values)
    for item in data.values():  # Adjusted to loop over dictionary values
        csv_writer.writerow(item.values())

print("JSON data successfully written to CSV.")
