const express = require("express")
const database = require("../db/knex")
const cors = require("cors")
const path = require("path");

const app = express()
app.use(express.json());
app.use(cors())

app.use(express.static(path.resolve(__dirname, "..", "dist")));

app.get("/", (request, response) => {
   response.sendStatus(200)
})

app.get("/match", async (request, response) => {
    const result = await database.select().table('match')
    response.send(result)
 })

 app.get("/match/:id", async (request, response) => {
    const id = request.params.id
    const result = await database.select().table('match').where('id',id)
    response.send(result)
 })

 app.post("/match", async (request, response) => {
    
    const getData = await database.select().table('match')
    const newId = getData.length===0 ? 0 : getData[getData.length-1].id + 1

    await database.table('match').insert({
        "id": newId,
        "transition": `${request.body.body}`,
        "date": new Date()
    })

    response.status(201).send()
 })

 app.delete("/match", async (request, response) => {
    await database.table('match').del()
    response.status(201).send()
  })

 app.delete("/match/:id", async (request, response) => {
    const id = request.params.id
    await database.table('match').where('id',id).del()
    response.status(201).send()
  })

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "dist", "index.html"));
  });



  module.exports = app;
// app.listen(9000, () => console.log(`App listening on port 9000!`));