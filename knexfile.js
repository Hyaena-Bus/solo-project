
module.exports = {


  development: {
    client: 'pg',
    connection: {
      database: 'marubatu',
      user:     'postgres',
      password: 'test'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory:'./db/migrations',
      tableName: 'knex_migrations'
    }
  }

};
