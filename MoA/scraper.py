import requests
from bs4 import BeautifulSoup

#go through the top k most relevant search results
#return array of the text for each one

error_str = "__error__"

def ExtractText(url):
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"}
    try:
        response = requests.get(url, headers=headers, allow_redirects=True, timeout=3)
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
    API_KEY = "AIzaSyAuUsgPIud8zD8srZl4pVgGMoM5eUo1swU"
    CSE_ID = "53b5546316d3649ab" #custom search engine ID
    ENDPOINT_URL = "https://www.googleapis.com/customsearch/v1"
    query_params = {"key": API_KEY, "cx": CSE_ID, "q": search_query}

    try:
        response = requests.get(ENDPOINT_URL, params=query_params)
        response.raise_for_status()
        response_json = response.json()
        if "items" not in response_json:
            return []

        meta = response_json["searchInformation"]
        links = [item["link"] for item in response_json["items"]] #Ordered by relevance
        print(links)
        link_texts = []
        for link in links:
            print(link)
            text = ExtractText(link)
            if text != error_str:
                link_texts.append(text)
            if len(link_texts) >= k:
                break
        return link_texts
    except Exception as err:
        print(f"An error occured when scraping: {err}")
        return []
