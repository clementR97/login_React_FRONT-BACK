import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import authRouter from './routes/authRoutes.js'
dotenv.config()
connectDB()

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
// configure of CORS
app.use(cors({
  origin:process.env.CLIENT_URL || 'http://localhost:5173',
  credentials:true,
  methods:['GET','POST','PUT','DELETE','PATCH'],
  allowedHeaders:['Content-Type','Authorization'],
}))
// Road
app.use('/api/auth',authRouter)

app.get('/', (req, res) => {
  res.json({ message: 'API Auth fonctionne ! 🚀' })
})

// Road no find
app.use((req,res)=>{
    res.status(404).json({message: 'Route non trouvée'})
})

app.use((err,req,res,next)=>{
  console.error('Erreur serveur:',err)
    res.status(500).json({
      message:'Erreur serveur',
      error:process.env.NODE_ENV==='development'? err.message:undefined
    })
 })

// start the server
const PORT = process.env.PORT || 2000
app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur le port ${PORT}`)
    console.log(`📍 http://localhost:${PORT}`)
})