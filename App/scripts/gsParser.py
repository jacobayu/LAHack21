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

# Cteates a list of course names
course_names = []
raw_course_names = soup.find_all('h3', {"class": "courseBox--shortname"})

for each in raw_course_names:
    each = str(each)
    
    new_each = each.lstrip('<h3 class="courseBox--shortname">')
    new_each = new_each.rstrip('</h3>')
    course_names.append(new_each)

# Creates a list of the unique course number identifier to be used in the course url
course_numbers = []
raw_course_numbers = soup.find_all('a', {"class": "courseBox"}, )

for each in raw_course_numbers:
    each = str(each)

    new_each = each[36:42]
    course_numbers.append(new_each)

# Creates a list of unique course urls
course_urls = []
url_header = "https://www.gradescope.com/courses/"

for each in course_numbers:
    url = url_header + each
    course_urls.append(url)

# Creates a dictionary with the key-value pair of {course_name : list_of_assignments}
course_with_assignments = {}

for each in course_names:
    course_with_assignments[each] = None

# Here, we want to go through each course page and create a list of assignments for each page
# We can add these assignments to a list and then add this list to their respective place in the dictionary course_with_assignments
#for each in course_urls:
#    
#    result = session_requests.get(
#        each,
#        headers = dict(referer = each)
#    )