import mongoose from "mongoose"
import bcrypt from "bcrypt"
// Défine le Schema
const userSchema = new mongoose.Schema(
    {
    name:{
        type: String,
        require:[true, 'le nom est requis'],
        trim: true

    },
        email:{
            type: String,
            require:[true,'Adresse mail requis'],
            unique: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Email invalide']
        },
                    password:{
                        // password is stored as a string 
                        type: String,
                        require:[true,'Mot de passe requis'],
                        minlength: [6, 'le mot de passe doit contenir au moins 6 caractères'],
                        // The field is NOT returned by default during MongoDB requests.
                        select: false
                    },
                            // stored a temporary token 
                            resetPasswordToken: String,
                            resetPasswordExpire : Date

    },
        {
            timestamps: true
        }
        // middleware: Hasing  and verify password
        
)
            userSchema.pre('save',async function(next){
                if(!this.isModified('passwor')){
                    return next()
                }
              const salt = await bcrypt.genSalt(10)
              this.password = await bcrypt.hash(this.password, salt)
              next()
        })

        // compare password
        userSchema.methods.comparePassword = async function(enteredPassword){
            return await bcrypt.compare(enteredPassword, this.password)
        }
        
        const User = mongoose.model('User',userSchema)
        export default User