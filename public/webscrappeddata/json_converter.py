import json
import csv

# Load the JSON data from the file with the correct encoding
with open('all_properties.json', 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)

# Open a CSV file to write
with open('output.csv', 'w', newline='', encoding='utf-8') as csv_file:
    # Create a CSV writer object
    csv_writer = csv.writer(csv_file)

    # Write the header (keys)
    header = data[0].keys()
    csv_writer.writerow(header)

    # Write the data (values)
    for item in data:
        csv_writer.writerow(item.values())
