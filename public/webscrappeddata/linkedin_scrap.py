import re
import json

# Specify the file name and path (if needed)
file_path = 'example_file.txt'
json_output_path = 'output.json'

# Step 1: Read content from the .txt file
with open(file_path, 'r', encoding='utf-8') as file:
    # Read the content of the file
    content = file.read()

# Step 2: Define the regex pattern to match <a> tags with the specified classes and extract the href attribute
href_pattern = re.compile(
    r'<a[^>]+class="[^"]*optional-action-target-wrapper artdeco-button artdeco-button--secondary artdeco-button--standard artdeco-button--2 artdeco-button--muted[^"]*"[^>]*href="([^"]+)"'
)

# Step 3: Extract the href values
hrefs = href_pattern.findall(content)

# Step 4: Define the regex pattern to match the text inside <span> elements under div with class "mr1 hoverable-link-text t-bold"
span_pattern = re.compile(
    r'<div[^>]*class="[^"]*mr1 hoverable-link-text t-bold[^"]*"[^>]*>.*?<span[^>]*>(.*?)</span>',
    re.DOTALL
)

# Step 5: Extract the span text values and remove any occurrences of <!---->
span_texts = [re.sub(r'<!--.*?-->', '', text).strip() for text in span_pattern.findall(content)]

# Step 6: Create a list of dictionaries where each URL and the corresponding cleaned text are stored as individual objects
data = [
    {'credential_certification_url': href, 'span_text': text} 
    for href, text in zip(hrefs, span_texts)
]

# Step 7: Write the data to a JSON file
with open(json_output_path, 'w', encoding='utf-8') as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=4)

print(f"Extracted URLs and cleaned span texts have been stored in {json_output_path}")
