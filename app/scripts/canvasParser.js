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
                name: data[i].name,
                course_start_date: data[i].start_at
            }
            console.log(JSON.stringify(course));
        }
        
    }
    
}

async function getCourses(){
    canvas.get('/api/v1/courses', parseCourses)
}
module.exports = {
    getCourses
}