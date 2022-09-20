import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
import 'dotenv/config'

const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const database = client.db("apex-legends")
const legends = database.collection("legends")

client.connect()
console.log("Connected to mongoDB")
const PORT = 4001

const app = express()
app.use(cors())
app.use(express.json())

app.listen(PORT, () => console.log("API is running on", PORT))

//GET
app.get('/', async (req, res) => {
  const allLegends = await legends.find().toArray()
  res.send(allLegends)
  console.log(allLegends)
})

// POST
app.post('/', async (req, res) => {
  await legends.insertOne(req.body)
  res.send('Legend added')
})

// PUT
app.put('/', async (req, res) => {
  await legends.findOneAndUpdate(req.query, {$set: req.body})
  res.json('Legend was updated')
})