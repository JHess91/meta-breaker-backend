import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
import 'dotenv/config'

const URI = "mongodb+srv://JustinHess1:Ash10012020!@justincluster.p1ygchi.mongodb.net/test" 
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