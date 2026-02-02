import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import sendEmail from "../utils/sendEmail.js";

// generate JWT
const generateToken = (id)=>{
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {expiresIn: '30d'}
    )
}

// sign-up
export const register = async(req,res)=>{
   try{ 
    const {name,email,password} = req.body

    if(!name || !email || !password){
        return res.status(400).json({
            message:'tous les champs sont requis'
        })
    }

    // verifie if the email had create
    const userExists = await User.findOne({email})

    if(userExists){
        return res.status(400).json({
            message: 'cette email est déja utilisé'
        })
    }
    // creating the user in the database
    const user = await User.create({
        name,
        email,
        password
    })
    // return data about user + token JWT

    res.status(201).json({
       _id: user._id,
       name: user.name,
       email: user.email,
       token: generateToken(user._id)
    })


    }catch (error){
        console.error('Erreur register:',error)
      res.status(500).json({message:error.message})
    }
}

// connexion
export const login =async (req,res)=>{
    try{
            const {email,password} = req.body
            if(!email || !password){
                return res.status(400).json({
                    message: 'Email et mot de passe requis'
                })
            }
                    const user = await User.findOne({email}).select('+password')
                    // verifie if the user it's in the database and password it's correct
                    if(user &&(await user.comparePassword(password))){
                        res.json({
                            _id:user._id,
                            name: user.name,
                            email: user.email,
                            token: generateToken(user._id)
                        })
                    }else{
                        // password or mail incorrect
                        res.status(401).json({
                            message:'Email ou mot de passe incorrect'
                        })
                    }
    }catch(error){
        console.error('Erreur de login:',error)
        res.status(500).json({message:error.message})
    }
}
// forgot password
export const forgotPassword = async(req,res)=>{
    try{
        const {email} = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                message: 'Aucun compte avec cet email'
            })
        }
        // generate token for recreat the password
        const resetToken = crypto.randomBytes(32).toString('hex')
        //hashing the token befor save
        user.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

        // define a date of expirate
        user.resetPasswordExpires = Date.now()+10*60*1000
        // save in the database
        await user.save()
        
        const resetUrl = `http://localhost:2000/reset-password/${resetToken}`
        await sendEmail({
            to: user.email,
            subject: 'Reinitialisation du mot de passe',
            text: `Clique ici pour réinitialiser ton mot de passe:${resetUrl}` 
        })
        // it return also the token in console.log for test
        console.log('token pour test:',resetToken)
        // product mode send a email with nodemail
        res.json({
            message:'Email de reinitialisation envoyé(Ethereal)',
            // resetToken
        }) 

    }catch(error){
        console.error('Erreur forgot password:',error)
        res.status(500).json({message:error.message})
        
    }
}
// reinitilise the password in the database
export const resetPassword = async(req,res)=>{
    try{
                const {password} = req.body
                const resetPasswordToken = crypto
                .createHash('sha256')
                .update(req.params.token)
                .digest('hex')

                        const user = await User.findOne({
                            resetPasswordToken,
                            resetPasswordExpires:{$gt: Date.now()}
                        })

                if(!user){
                    return res.status(400).json({
                        message: 'Token invalide ou expiré'
                    })
                }
                user.password = password

                // delete the token of reinitilise 
                user.resetPasswordToken = undefined
                user.resetPasswordExpires = undefined
                await user.save()
                res.json({
                    message: 'Mot de passe réinitialisé avec succes'
                })

    }catch(error){
        console.error('Erreur reset password:',error)
        res.status(500).json({message:error.message})
        
    }
}
// to get the profil of user
export const getProfil = async(req,res)=>{
    try{
        const user = await User.findById(req.user._id)
        if(user){
            res.json({
               _id: user._id,
            name: user.name,
            email:user.email,
            createAt: user.createdAt
            }) 
        }else{
            res.status(404).json({
                message:'Utilisateur non trouvé'
            })
        }

    }catch(error){
        console.error('Erreur get profile:',error)
        res.status(500).json({message:error.message})
    }
}