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
    console.log(data);
}

async function getCourses(){
    canvas.get('/api/v1/courses', parseCourses)
}
module.exports = {
    getCourses
}