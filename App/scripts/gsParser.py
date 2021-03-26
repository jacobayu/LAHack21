import requests
from bs4 import BeautifulSoup
from lxml import html
import pandas as pd
import os.path


session_requests = requests.session()
login_url = "https://www.gradescope.com/login"
result = session_requests.get(login_url)
tree = html.fromstring(result.text)
authenticity_token = list(set(tree.xpath("//input[@name='authenticity_token']/@value")))[0]

payload = {
    "session[email]": "csl2183@columbia.edu",
    "session[password]": "Legominecraft733",
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

# Creates a list of course names
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

# Initializing a list for dictionaries of key-value pairs of {assignment name : due_date}
assignments = []

# Here, we want to go through each course page and create a list of assignments for each page
# We can add these assignments to a list and then add this list to their respective place in the dictionary course_with_assignments
for each in course_urls:
    
    result = session_requests.get(
        each,
        headers = dict(referer = each)
    )

    c = result.content
    soup = BeautifulSoup(c, features="lxml")
    tables = soup.find('table', {"class":"table"})
    assignment_lists = pd.read_html(str(tables))[0]
    
    course_assignments = {}

    names = assignment_lists['Name'].tolist()
    due_dates = assignment_lists['Due Date'].tolist()

    for i in range(0,len(names)):
        course_assignments[str(names[i])] = str(due_dates[i])

    assignments.append(course_assignments)


# This creates a list of courses with their course numbers
list_of_courses = []
for i in range(0, len(course_names)):
    list_of_courses.append(course_names[i] + " | " + course_numbers[i])
    print(list_of_courses[i])

# Creates a dictionary with the key-value pair of {course : list_of_assignments}
course_with_assignments = {}

# Bringing everything together! Dictionary with key-value pairs of {course : course_assignments}
for i in range(0,len(list_of_courses)):
    course_with_assignments[list_of_courses[i]] = assignments[i]


# Now converting our dictionary to the text file gsParser_results so we can put it into js database
import json

course_with_assignments = json.dumps(course_with_assignments,indent=4,sort_keys=True)
save_path = "C:/Users/Sean Chang/Documents/GitHub/LAHack21/App/scripts"
completeName = os.path.join(save_path, 'gsParser_results.txt')
with open(completeName, 'w') as file:
    file.write(course_with_assignments)
