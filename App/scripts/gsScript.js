const { strictEqual } = require('assert');
var fs = require('fs');
const { setFlagsFromString } = require('v8');
var file = fs.readFile("gsParser_results.txt", "utf8", function (err, data) {
    if (err) {
        throw err;
    }
});

file = JSON.stringify(file);

var courses = {};
var assignments = {};
var assignmentFlag = false;

for (var i = 1; i < file.length()-1; i++) {
    if (file.charAt(i) == '{') {
        assignmentFlag = true;
    } else if (file.charAt(i) == '}') {
        assignmentFlag = false;
    }
    if (assignmentFlag) {
        // If the flag is true, this means we are looking at the assignments
    } else {
        // If the flag is false, this means we are looking at the course name
    }
}