// const environment = "development";
// const config = require("../knexfile")[environment]
// const database = require("knex")(config);

const knex = require("knex");

const database = knex({
    client: "pg",
    connection:
      `postgres://micbytzxnpgyso:d7f1043007d7b364cbef98aba3d13280d8d830ce6b34c74b9f874e2d3c82e2a8@ec2-3-233-7-12.compute-1.amazonaws.com:5432/deilqavej05glh` ,
    //    `postgresql://${process.env.USER}:${process.env.PASSWORD}@127.0.0.1:5432/marubatu`,
    searchPath: "public",
  });


module.exports = database;