
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

# Array to store all property data as dictionaries
all_properties = []

# Start with the first page
page_number = 1

while True:
    # Construct the URL for the current page
    url = f"{base_url}{page_number}/"
    
    # Send a GET request with the User-Agent header
    response = requests.get(url, headers=headers)
    
    # Check if the request was successful
    if response.status_code != 200:
        print(f"Failed to retrieve page {page_number}. Status code: {response.status_code}")
        break
    
    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find all <div> elements with the class 'property__description d-none d-md-block'
    divs = soup.find_all('div', class_='property__description d-none d-md-block')
    
    # If no properties are found, break the loop (end of pagination)
    if not divs:
        print("No more properties found, ending pagination.")
        break
    
    # Extract the links and branch location from the <div> elements
    for div in divs:
        a_tag = div.find('a', href=True)
        if a_tag:
            property_url = a_tag['href']
            
            # Fetch the detailed information for each property URL
            detailed_response = requests.get(property_url, headers=headers)
            if detailed_response.status_code == 200:
                detailed_soup = BeautifulSoup(detailed_response.content, "html.parser")
                
                # Find and extract content from the div with class 'limitedTextSpace'
                limited_text_space = detailed_soup.find("div", class_="limitedTextSpace")
                property_description = ""
                if limited_text_space:
                    paragraphs = limited_text_space.find_all("p")
                    property_description = " ".join(paragraph.text.strip() for paragraph in paragraphs)
                
                # Find and extract the content from the <p> tag with class 'fw-medium'
                fw_medium_p = detailed_soup.find("p", class_="fw-medium")
                if fw_medium_p:
                    branch_location = fw_medium_p.text.strip()
                
                # Find and extract the content from the script tag with class 'tpj-schema-graph'
                script_tag = detailed_soup.find("script", class_="tpj-schema-graph")
                date_created = "Date Created not found"
                if script_tag:
                    script_content = script_tag.string
                    try:
                        json_data = json.loads(script_content)
                        date_created = json_data.get('@graph', {}).get('dateCreated', 'Date Created not found')
                    except json.JSONDecodeError:
                        print(f"Failed to decode JSON from the script tag for {property_url}.")
                
                # Store the detailed data in the dictionary
                property_data = {
                    'property_url': property_url,
                    'branch_location': branch_location,
                    'property_description': property_description,
                    'date_created': date_created
                }
                all_properties.append(property_data)
            else:
                print(f"Failed to retrieve details for {property_url}. Status code: {detailed_response.status_code}")
    
    # Move to the next page
    page_number += 1

# Check if any properties were found
if not all_properties:
    print("No property data was found. Please check the structure of the webpage.")
else:
    # Export the property data to a JSON file
    with open('property_links.json', 'w') as json_file:
        json.dump(all_properties, json_file, indent=4)
    print(f"Found {len(all_properties)} properties and saved them to 'property_links.json'.")

    # Export the property data to a CSV file
    csv_file = 'property_links.csv'
    with open(csv_file, 'w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=['property_url', 'branch_location', 'property_description', 'date_created'])
        writer.writeheader()
        writer.writerows(all_properties)
    print(f"Found {len(all_properties)} properties and saved them to '{csv_file}'.")
