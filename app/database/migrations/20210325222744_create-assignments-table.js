
exports.up = function(knex) {
    return knex.schema.createTable('assignments', table => {
        //table.foreign('id').references('course_id').inTable('courses');
        table.string('assignment_name');
        table.integer('assignment_id');
        table.string('assignment_desc');
        table.datetime('due_date');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('assignments');
};
