import mongoose,{Schema} from "mongoose"


const userSchema = new Schema(
    {
        username:{
            type:String,
            required:[true,"username is required"],
            unique:true,

        },
        email:{
              type:String,
            required:[true,"email is required"],
            unique:true,

        },
        password:{
              type:String,
            required:[true,"password is required"],
            unique:true,
        },
        isVerfiyed:{
            type:Boolean,
            default:false
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        forgetPasswordToken:String,
        forgetPasswordTokenExpiry:Date,
        verificationToken:String,
        verificationTokenExpiry:Date
    },
    {
        timestamps:true

    }
)


const User =  mongoose.models.User || mongoose.model("User",userSchema)

export default User