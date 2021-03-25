const db = require('../database/dbConfig.js');

/**
 * 
 * @param {
 *  course_id 
 *  course_name
 *  course_start_date
 * } course 
 */
async function insert(course){
    try {
        await db('courses')
        .insert(course)
    }catch(e){
        console.error("Error: failed to insert course", e)
    }
}

async function update(filter, updatedCourse){
    try {
        await db('courses')
              .where(filter)
              .update(updatedCourse);
    } catch(e){
        console.error("Error: failed to update course", e);
    }
}

async function get(filter){
    try {
        jobs = await db('courses')
                     .select('*')
                     .where(filter);
        return jobs;
    } catch(e){
        console.error("Error: failed to retrieve courses", e);
    }
}

async function getAll(){
    try {
        const jobs = await db('jobs')
            .select('*');
        return jobs;
    } catch(e){
        console.error("Error: failed to retrieve jobs", e);
    }
}
module.exports = {
    insert,
    update,
    get,
    getAll
}