import requests
from bs4 import BeautifulSoup
import os
from dotenv import load_dotenv
from pathlib import Path

error_str = "__error__"

script_dir = Path(__file__).parent
load_dotenv(script_dir/"../.env")

def ExtractText(url):
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"}
    try:
        response = requests.get(url, headers=headers, allow_redirects=True, timeout=2)
        response.raise_for_status()
        #parse html content and extract text
        soup = BeautifulSoup(response.content, "html.parser")
        return soup.get_text()
    except Exception as err:
        print(f"The following error occured when parsing pages: {err}")
        return error_str


#use the Google Programmable Search Engine API
#return the top k results for search query, from which we can extract text. Note: we only look at first page
def Scrape(search_query, k):
    api_key = os.getenv("CSE_API_KEY")
    cse_id = os.getenv("CSE_ID")
    ENDPOINT_URL = "https://www.googleapis.com/customsearch/v1"
    query_params = {"key": api_key, "cx": cse_id, "q": search_query}

    try:
        response = requests.get(ENDPOINT_URL, params=query_params)
        response.raise_for_status()
        response_json = response.json()
        if "items" not in response_json:
            return []

        meta = response_json["searchInformation"]
        links = [item["link"] for item in response_json["items"]] #Ordered by relevance
        link_texts = [] #list of pairs (link, text)
        for link in links:
            text = ExtractText(link)
            if text != error_str:
                link_texts.append((link, text))
            if len(link_texts) >= k:
                break
        return link_texts
    except Exception as err:
        print(f"An error occured when scraping: {err}")
        return []

res = Scrape("israel palestine conflict from a right-wing perspective", 5)
for x in res:
    print(x)
