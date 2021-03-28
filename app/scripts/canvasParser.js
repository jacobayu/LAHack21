var model = require('../models/dbmodels')
var canvas = require('canvas-api-wrapper');
canvas.baseUrl = 'https://canvas.ucsd.edu';
canvas.subdomain = "ucsd.edu";
canvas.apiToken=process.env.CANVAS_TOKEN;
console.log("jacob is genius");

async function parseCourses(err, data){
    if(err) {
        console.error(err);
        return 
    }
    else{
        for(i = 0; i < data.length; i++){
            const course = {
                course_id: data[i].id,
                course_name: data[i].name,
                course_start_date: data[i].start_at
            }
            const filter = {
                course_id: data[i].id
            }
            const courseAlreadyExists = await model.getCourse(filter);
            if(courseAlreadyExists.length === 0){
                model.insertCourse(course);
            }
            else{
                model.updateCourse(filter, course);
            }
            //console.log(JSON.stringify(course));

        }
        
    }
    
}

async function parseAssignments(err, data){
    if(err) {
        console.error(err);
        return 
    }
    else{
        for(i = 0; i < data.length;i++){
            const assignment = {
                assignment_name: data[i].name, 
                assignment_id: data[i].id,
                assignment_desc: data[i].description,
                due_date: data[i].due_at
            }
            const filter = {
                assignment_id: data[i].id,
            }
            const assignmentAlreadyExists = await model.getAssignment(filter);
            if(assignmentAlreadyExists.length === 0){
                console.log(JSON.stringify(assignment))
                model.insertAssignment(assignment);
            }
            else{
                console.log(JSON.stringify(assignment))
                model.updateAssignment(filter, assignment);
            }
        }

        
    }
}
async function getCourses(){
    canvas.get('/api/v1/courses', parseCourses)
}

async function getAssignments(){
    const courses = await model.getAllCourses();
    for(i = 0; i < courses.length; i++){
        var urlString = '/api/v1/courses/' + courses[i].course_id + 
            '/assignments';
        canvas.get(urlString, parseAssignments);
    }
}
module.exports = {
    getCourses,
    getAssignments
}