
exports.up = function(knex) {
    return knex.schema.createTable('courses', function(table) {
        table.increments('id').unique().notNullable();
        table.integer('course_id').unsigned();
        table.string('course_name');
        table.datetime('course_start_date');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('courses');
};
