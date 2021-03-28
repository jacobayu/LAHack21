var fs = require('fs');
var model = require('../models/dbmodels')
var fileData = fs.readFileSync('gsParser_results.txt').toString();

async function getCourses() {
var courses = [];
var assignments = [];
var assignmentFlag = false;

/* Collapse this for-loop for easier comprehension; this for-loop just reads the file data,
 * puts courses with their respective ID and assignments with their respective due dates.
 * The end result two lists of lists:
 *  -courses      --> [ [ courseName, courseID ] ]
 *  -assignments  --> [ [ assignmentName, assignmentDate ] ]
*/
for (var i = 1; i < fileData.length-1; i++) {
    if (fileData.charAt(i) == '{') {
        assignmentFlag = true;
    } else if (fileData.charAt(i) == '}') {
        assignmentFlag = false;
    }
    
    if (assignmentFlag) {
        if (fileData.charAt(i) == '"') {
            var nameCounter = 0;
            var dateCounter = 0;
            if (fileData.charAt(i+1) != '2' 
            && fileData.charAt(i+1) != ':' 
            && fileData.charAt(i+1) != ',' 
            && fileData.charAt(i+1) != '}') {
                for (var j = i + 1; j < fileData.length-1; j++) {
                    if (fileData.charAt(j) == '"') {
                        break;
                    }
                    nameCounter++;
                }
                for (var j = i+nameCounter+5; j < fileData.length; j++) {
                    if (fileData.charAt(j) == '"') {
                        break;
                    }
                    dateCounter++;
                }
                
            }
            
            var assignmentName = fileData.substring(i+1,i+nameCounter+1);
            var assignmentDate = fileData.substring(i+nameCounter+5,i+nameCounter+dateCounter-1);
            var singleAssignment = []
            if (dateCounter != 0) {
                singleAssignment.push(assignmentName);
                singleAssignment.push(assignmentDate);
                assignments.push(singleAssignment);
            }
            
        }
    } else {
        if (fileData.charAt(i) == '"') {
            var nameCounter = -1;
            var idCounter = -1;
            var flag = false;
            if (fileData.charAt(i+1) != ':') {
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
                var courseName = fileData.substring(i+1,i+nameCounter+1);
                var courseID = fileData.substring(i+nameCounter+4, i+nameCounter+idCounter+3);
                var singleCourse = [];
                singleCourse.push(courseName);
                singleCourse.push(courseID);
                courses.push(singleCourse);
            }
        }
    }
}

// Next Steps: take these lists and add them to the database so they can be uploaded to the calendar.
model.deleteAll()
for (var i=0; i < assignments.length; i++) {
    if (assignments[i][1].length == 19) {
        var due_date = assignments[i][1];
        var year = parseInt(due_date.substring(0, 4));
        var month = parseInt(due_date.substring(5, 7))-1;
        var day = parseInt(due_date.substring(8, 10));
        var hours = parseInt(due_date.substring(11, 13));
        var minutes = parseInt(due_date.substring(14, 16));
        var d = new Date(year, month, day, hours, minutes);
        var d2 = d.toISOString();
        const assignment = {
            assignment_name: assignments[i][0], 
            due_date: d
        }
        const filter = {
            assignment_name: assignments[i][0]
        }
        const assignmentAlreadyExists = model.getAssignment(filter);
        model.insertAssignment(assignment);
    }
} 
}
module.exports = {
    getCourses
}