exports.up = function(knex) {
    return knex.schema.createTable("match", (table) => {
      table.increments('id').index();
  
      table.text('transition')
  
      table.date('date')
    });
  };
  
  exports.down = function(knex, Promise) {};
  