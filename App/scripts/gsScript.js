var fs = require('fs');
var fileData = fs.readFileSync('gsParser_results.txt').toString();

var courses = [];
var assignments = [];
var assignmentFlag = false;

for (var i = 1; i < fileData.length-1; i++) {
    if (fileData.charAt(i) == '{') {
        assignmentFlag = true;
    } else if (fileData.charAt(i) == '}') {
        assignmentFlag = false;
    }
    
    if (assignmentFlag) {
        // If the flag is true, this means we are looking at the assignments
    } else {
        if (fileData.charAt(i) == '"') {
            var nameCounter = -1;
            var idCounter = -1;
            var flag = false;
            var courseName = "";
            var courseID = "";
            if (fileData.charAt(i+1) != ':' && fileData.charAt(i+1) != ',') {
                for (var j = i + 1; j < fileData.length; j++) {
                    if (fileData.charAt(j) == '"') {
                        break;
                    }
                    if (fileData.charAt(j) == '|') {
                        flag = true;
                    }

                    if (flag) {
                        idCounter++;
                    } else {
                        nameCounter++;
                    }
                }
                courseName = fileData.substring(i+1,i+nameCounter+1);
                courseID = fileData.substring(i+nameCounter+4, i+nameCounter+idCounter+3);
                var singleCourse = [];
                singleCourse.push(courseName);
                singleCourse.push(courseID);
                courses.push(singleCourse);
            }
        }
    }
}

console.log(courses);
