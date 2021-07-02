import requests 
# URL = 'http://localhost:5000/build/static/js/runtime-main.c140b409.js'
URL = 'http://localhost:3001/index.js' 
response = requests.get(URL) 
print(response.text)

