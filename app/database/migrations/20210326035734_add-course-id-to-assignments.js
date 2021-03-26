exports.up = function(knex, Promise) {
    knex.schema.table('assignments', function(table) {
        table.integer('course_id').references('course_id').inTable('courses');
    })
  }
  
exports.down = function(knex, Promise) {
    knex.schema.table('assignments', function(table) {
        table.dropColumn('course_id')
    })
}

