import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()

import connectDB from './config/db.js'
connectDB()



app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API Auth fonctionne ! 🚀' })
})

const PORT = process.env.PORT || 2000

app.listen(PORT, () => {
  console.log(`✅ Serveur sur le port ${PORT}`)
})