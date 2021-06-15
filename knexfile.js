
module.exports = {


  development: {
    client: 'pg',
    connection: {
      database: 'marubatu',
      user:     'postgres',
      password: 'test'
    }
    ||   `postgres://micbytzxnpgyso:d7f1043007d7b364cbef98aba3d13280d8d830ce6b34c74b9f874e2d3c82e2a8@ec2-3-233-7-12.compute-1.amazonaws.com:5432/marubatu`,

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
