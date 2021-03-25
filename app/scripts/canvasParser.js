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
            const courseAlreadyExists = await model.get(filter);
            if(courseAlreadyExists.length === 0){
                model.insert(course);
            }
            else{
                model.update(filter, course);
            }
            console.log(JSON.stringify(course));
        }
        
    }
    
}

async function getCourses(){
    canvas.get('/api/v1/courses', parseCourses)
}

async function getAssignments(){
    const courses = await model.getAll();
    for(i = 0; i < courses.length; i++){
        var urlString = '/api/v1/courses/' + string(courses[i].course_id) + 
            '/assignments';
        canvas.get(urlString, parseAssignments);
    }
}
module.exports = {
    getCourses,
    getAssignments
}