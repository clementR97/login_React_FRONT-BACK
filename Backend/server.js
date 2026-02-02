import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import authRouter from './routes/authRoutes.js'
dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Road
app.use('/api/auth',authRouter)

app.get('/', (req, res) => {
  res.json({ message: 'API Auth fonctionne ! 🚀' })
})

// Road no find
app.use((req,res)=>{
    res.status(404).json({message: 'Route non trouvée'})
})

// start the server
const PORT = process.env.PORT || 2000
app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur le port ${PORT}`)
    console.log(`📍 http://localhost:${PORT}`)
})