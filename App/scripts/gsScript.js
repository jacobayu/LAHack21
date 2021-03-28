var fs = require('fs');
var model = require('../models/dbmodels')
var fileData = fs.readFileSync('gsParser_results.txt').toString();

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
for (var i=0; i < assignments.length; i++) {
        const assignment = {
            assignment_name: assignments[i][0], 
            due_date: assignments[i][1]
        }
        const filter = {
            assignment_name: assignments[i][0]
        }
        const assignmentAlreadyExists = model.getAssignment(filter);
        if(assignmentAlreadyExists.length === 0){
            model.insertAssignment(assignment);
        }
        else{
            model.updateAssignment(filter, assignment);
        }
}
