const canvasParser = require('./canvasParser');
const gsParser = require('./gsScript')

function startScript(){
    gsParser.getCourses();
    canvasParser.getCourses();
    canvasParser.getAssignments();
}

module.exports = {
    startScript
};