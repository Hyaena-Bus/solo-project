const express = require("express")
const database = require("../db/knex")
const cors = require("cors")

const app = express()
app.use(express.json());
app.use(cors())

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
    const newId = getData[getData.length-1].id + 1

    await database.table('match').insert({
        "id": newId,
        "transition": `${request.body.body}`,
        "date": new Date()
    })

    response.status(201).send()
 })


app.listen(9000, () => console.log(`App listening on port 9000!`));