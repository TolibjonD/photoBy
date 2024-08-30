import requests

url = "https://aspose-imaging-cloud1.p.rapidapi.com/imaging/%7Bname%7D/wmf"

querystring = {"fromScratch":"false","format":"png"}

headers = {
	"x-rapidapi-key": "a0073c1790mshfd644a326ced12ep1e7f05jsnccae13a241ed",
	"x-rapidapi-host": "aspose-imaging-cloud1.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())