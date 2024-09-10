import requests
from bs4 import BeautifulSoup
import json
import csv

# Base URL with pagination
base_url = 'https://www.country-properties.co.uk/property-search/for-sale/in-hertfordshire-and-bedfordshire/page-'

# Custom User-Agent header
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

# Array to store all property data
all_properties_array = []

# Start with the first page
page_number = 1

while True:
    # Construct the URL for the current page
    url = f"{base_url}{page_number}/"
    
    # Send a GET request with the User-Agent header
    response = requests.get(url, headers=headers)
    
    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content using BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find all <div> elements with the specified class
        divs = soup.find_all('div', class_='property-title property-title--search')
        
        # If no divs are found, we've reached the last page
        if not divs:
            break
        
        # Extract <a> tags from those <div> elements
        for div in divs:
            a_tag = div.find('a')
            if a_tag:
                property_url = a_tag['href']
                
#                 # Make a request to the property page to get additional details
                property_response = requests.get(property_url, headers=headers)
                
                if property_response.status_code == 200:
                    property_soup = BeautifulSoup(property_response.text, 'html.parser')
                    
                    # Find the first image with the specified class
                    image_tag = property_soup.find('img', class_='property-banner__image img-fluid')
                    image_url = image_tag['src'] if image_tag else 'No image found'
                    
                    # Find the property description (text in both divs under the specific class)
                    description_divs = property_soup.find_all('div', class_='property-description mb-5')
                    property_description = ' '.join(div.get_text(strip=True) for div in description_divs)
                    
                    # Find the branch location
                    branch_div = property_soup.find('h4', class_='mt-0 mb-3')
                    branch_location = branch_div.get_text(strip=True) if branch_div else 'No branch location found'
                    
                    # Extract the dateCreated value from the JSON-LD script
                    script_tag = property_soup.find('script', class_='tpj-schema-graph')
                    
                    if script_tag:
                        # Extract the raw content from the script tag
                        raw_data = script_tag.string
                        
                        # Parse the raw JSON data
                        data = json.loads(raw_data)
                        
                        # Extract the "dateCreated" field
                        date_created = data.get('@graph', {}).get('dateCreated', 'Date not found')
                    else:
                        date_created = 'Date not found'
                    
                    # Add the property data to the array
                    all_properties_array.append({
                        'property_url': property_url,
                        'property_image_url': image_url,
                        'property_description': property_description,
                        'branch_location': branch_location,
                        'date_created': date_created  # Add date created value here
                    })
        
        # Move to the next page
        page_number += 1
    else:
        print(f"Failed to retrieve page {page_number}, status code: {response.status_code}")
        break

# Now all_properties_array contains all property data as objects
print("All properties collected as objects in array:", all_properties_array)

# Export all property objects to a JSON file
with open('all_properties.json', 'w', encoding='utf-8') as json_file:
    json.dump(all_properties_array, json_file, ensure_ascii=False, indent=4)

print(f"All property data from {page_number - 1} pages saved to 'all_properties.json'")

# Export all property objects to a CSV file
csv_file_path = 'all_properties_fulldetails.csv'
csv_columns = ['property_url', 'property_image_url', 'property_description', 'branch_location', 'date_created']  # Include date_created in CSV

try:
    with open(csv_file_path, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
        writer.writeheader()
        for data in all_properties_array:
            writer.writerow(data)

    print(f"All property data saved to '{csv_file_path}'")
except IOError:
    print("I/O error while writing CSV file")