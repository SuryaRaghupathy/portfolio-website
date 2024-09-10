import requests
from bs4 import BeautifulSoup
import json

# URL of the webpage
url = "https://www.country-properties.co.uk/properties-for-sale/3-bedrooms-semi-detached-house-in-hitchin-sg4/27718382/"

# Define headers with a User-Agent to mimic a browser
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

# Send a GET request to the URL with headers
response = requests.get(url, headers=headers)

# Check if the request was successful
if response.status_code == 200:
    # Parse the content of the response with BeautifulSoup
    soup = BeautifulSoup(response.content, "html.parser")
    
    # Find and extract content from the div with class 'limitedTextSpace'
    limited_text_space = soup.find("div", class_="limitedTextSpace")
    
    if limited_text_space:
        paragraphs = limited_text_space.find_all("p")
        print("Content from 'limitedTextSpace':")
        for paragraph in paragraphs:
            print(paragraph.text.strip())
    else:
        print("Div with class 'limitedTextSpace' not found.")
    
    # Find and extract the content from the <p> tag with class 'fw-medium'
    fw_medium_p = soup.find("p", class_="fw-medium")
    
    if fw_medium_p:
        print("\nContent from 'fw-medium':")
        print(fw_medium_p.text.strip())
    else:
        print("Paragraph with class 'fw-medium' not found.")
    
    # Find and extract the content from the script tag with class 'tpj-schema-graph'
    script_tag = soup.find("script", class_="tpj-schema-graph")
    
    if script_tag:
        # Extract and parse the content of the script tag
        script_content = script_tag.string
        try:
            json_data = json.loads(script_content)
            date_created = json_data.get('@graph', {}).get('dateCreated', 'Date Created not found')
            print("\nDate Created:")
            print(date_created)
        except json.JSONDecodeError:
            print("Failed to decode JSON from the script tag.")
    else:
        print("Script tag with class 'tpj-schema-graph' not found.")
else:
    print(f"Failed to retrieve the page. Status code: {response.status_code}")
