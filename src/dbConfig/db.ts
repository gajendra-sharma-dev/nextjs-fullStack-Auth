import mongoose, { connection } from "mongoose";

export default async function conntedDb(){
       try {
         if(mongoose.connection.readyState > 1) {
            return
         }
       await mongoose.connect(process.env.MONGODB_URL!)
     const connection = mongoose.connection

     connection.on('connectd',()=>{
        console.log("successfully connteced to dataBase");
    
     })

     connection.on('error',(error)=>{
        console.log("error while connection to mongo db",error);
        
     })
      
         
       } catch (error) {
        console.log("connection failed!",error);
        process.exit(1)
       }
}