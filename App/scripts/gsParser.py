import requests
from bs4 import BeautifulSoup
from lxml import html



session_requests = requests.session()
login_url = "https://www.gradescope.com/login"
result = session_requests.get(login_url)
tree = html.fromstring(result.text)
authenticity_token = list(set(tree.xpath("//input[@name='authenticity_token']/@value")))[0]

payload = {
    "session[email]": "<USERNAME>",
    "session[password]": "<PASSWORD>",
    "authenticity_token": authenticity_token
}

result = session_requests.post(
    login_url,
    data = payload,
    headers = dict(referer=login_url)
)

url = 'https://www.gradescope.com/account'
result = session_requests.get(
    url,
    headers = dict(referer = url)
)

c = result.content
soup = BeautifulSoup(c, features="lxml")

raw_course_names = soup.find_all('h4', {"class": "courseBox--name"})

course_names = []

for each in raw_course_names:
    each = str(each)
    
    new_each = each.lstrip('<h4 class="courseBox--name">')
    new_each = new_each.rstrip('</h4>')
    course_names.append(new_each)

print(course_names)

