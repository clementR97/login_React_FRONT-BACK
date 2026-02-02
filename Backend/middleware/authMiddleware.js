import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Middleware for protect the routes
export const protect = async (req,res,next)=>{
    let token

    // Verifie if the header Authorization exsite and start by Bearer
    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ){
        try{
            // Recover the token (format: "Bearer token")
            token = req.headers.authorization.split(' ')[1]
            //verifie and decod the token
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            // Add user in the request( without the password)
            req.user = await User.findById(decoded.id).select('-password')

            if(!req.user){
                return res.status(401).json({message:'Utilisateur non trouvé'})
            }
            next()

        }catch(error){
            console.error('Erreur auth middleware:',error)
            res.status(401).json({message: 'Non autorisé, token invalide'})
        }
    }
    if(!token){
        res.status(401).json({message:'Non autorisé, pas de token'})
    }
}