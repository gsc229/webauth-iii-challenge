/* The user schema should include: username, password and department. The department should be a string used to group the users. No need for a departments table or setting up relationships. */
exports.up = function (knex) {
  return knex.schema.createTable('users', col => {
    col.increments();

    col.string('username', 123)
      .notNullable()
      .unique();
    col.string('password', 128)
      .notNullable();
    col.string('department', 128)
      .notNullable();
  })

};

exports.down = function (knex) {
  knex.schema.dropTableIfExists('users')
};
