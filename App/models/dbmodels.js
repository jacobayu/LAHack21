const db = require('../database/dbConfig.js');

/**
 * 
 * @param {
 *  course_id 
 *  course_name
 *  course_start_date
 * } course 
 */
async function insertCourse(course){
    try {
        await db('courses')
        .insert(course)
    }catch(e){
        console.error("Error: failed to insert course", e)
    }
}

async function updateCourse(filter, updatedCourse){
    try {
        await db('courses')
              .where(filter)
              .update(updatedCourse);
    } catch(e){
        console.error("Error: failed to update course", e);
    }
}

async function getCourse(filter){
    try {
        jobs = await db('courses')
                     .select('*')
                     .where(filter);
        return jobs;
    } catch(e){
        console.error("Error: failed to retrieve courses", e);
    }
}

async function getAllCourses(){
    try {
        const jobs = await db('courses')
            .select('*');
        return jobs;
    } catch(e){
        console.error("Error: failed to retrieve jobs", e);
    }
}

async function insertAssignment(assignment){
    try {
        await db('assignments')
        .insert(assignment)
    }catch(e){
        console.error("Error: failed to insert assignment", e)
    }
}

async function updateAssignment(filter, updatedAssignment){
    try {
        await db('assignments')
              .where(filter)
              .update(updatedAssignment);
    } catch(e){
        console.error("Error: failed to update assignment", e);
    }
}

async function getAssignment(filter){
    try {
        jobs = await db('assignments')
                     .select('*')
                     .where(filter);
        return jobs;
    } catch(e){
        console.error("Error: failed to retrieve assignment", e);
    }
}

async function getAllAssignments(){
    try {
        const jobs = await db('assignments')
            .select('*');
        return jobs;
    } catch(e){
        console.error("Error: failed to retrieve assignment", e);
    }
}

async function deleteAll() {
    try {
        const jobs = await db('assignments')
            .delete();
        return jobs;
    } catch(e){
        console.error("Error: failed to retrieve assignment", e);
    }
}

module.exports = {
    insertCourse,
    updateCourse,
    getCourse,
    getAllCourses,
    insertAssignment,
    updateAssignment,
    getAllAssignments,
    getAssignment,
    deleteAll
}