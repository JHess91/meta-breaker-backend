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

app.listen(PORT, () => console.log("API is running on", process.env.PORT))

//GET
// app.get('/', async (req, res) => {
//   const allLegends = await legends.find().toArray()
//   res.send(allLegends)
//   console.log(allLegends)
// })