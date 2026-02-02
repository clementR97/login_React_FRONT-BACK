import mongoose from "mongoose"
import bcrypt from "bcryptjs"
// Défine le Schema
const userSchema = new mongoose.Schema(
    {
    name:{
        type: String,
        require:[true, 'le nom est required'],
        trim: true

    },
        email:{
            type: String,
            required:[true,'Adresse mail required'],
            unique: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Email invalide']
        },
                    password:{
                        // password is stored as a string 
                        type: String,
                        require:[true,'Mot de passe requied'],
                        minlength: [6, 'le mot de passe doit contenir au moins 6 caractères'],
                        // The field is NOT returned by default during MongoDB requests.
                        select: false
                    },
                            // stored a temporary token 
                            resetPasswordToken: String,
                            resetPasswordExpires : Date

    },
        {
            timestamps: true
        }
        // middleware: Hasing  and verify password
        
)
            userSchema.pre('save',async function(){
                if(!this.isModified('password')) return
                    
                
              const salt = await bcrypt.genSalt(10)
              this.password = await bcrypt.hash(this.password, salt)
              
        })

        // compare password
        userSchema.methods.comparePassword = async function(enteredPassword){
            return await bcrypt.compare(enteredPassword, this.password)
        }
        
        const User = mongoose.model('User',userSchema)
        export default User