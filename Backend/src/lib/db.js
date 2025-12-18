import mongoose from 'mongoose'

export const connectDB= async()=>{
    try{
        const {MONGODB_URI} = process.env;
        if(!MONGODB_URI) throw new Error("Mnongo URI not set")

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongodb connected:", conn.connection.host)
    }
    catch(error){
        console.log("Error: ",error);
        process.exit(1); //1 means fail and 0 means success

    }
}