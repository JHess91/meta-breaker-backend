import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
import 'dotenv/config'

const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const database = client.db("apex-legends")
const legends = database.collection("legends")
const guns = database.collection("guns")
const randomImg = database.collection("random-img")


client.connect()
console.log("Connected to mongoDB")
const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())

app.listen(PORT, () => console.log("API is running on", PORT))

//GET
app.get('/', async (req, res) => {
  const allLegends = await legends.find().toArray()
  const sortedLegends = allLegends.sort((a,b) => a.name-b.name)
  res.send(sortedLegends)
  console.log(sortedLegends)
})

app.get('/guns', async (req, res) => {
  const allGuns = await guns.find().toArray()
  const sortedGuns = allGuns.sort((a,b) => a.name-b.name)
  res.send(sortedGuns)
  console.log(sortedGuns)
})

app.get('/random-img', async (req, res) => {
  const allRandomImg = await randomImg.find().toArray()
  const sortedRandomImg = allRandomImg.sort((a,b) => a.name-b.name)
  res.send(sortedRandomImg)
  console.log(sortedRandomImg)
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

// Delete
app.delete('/', async (req,res) => {
  await legends.findOneAndDelete(req.query)
  res.json('Legend was deleted')
})