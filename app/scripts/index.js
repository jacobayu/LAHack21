const canvasParser = require('./canvasParser');

function startScript(){
    canvasParser.getCourses();
    canvasParser.getAssignments();
}

module.exports = {
    startScript
};