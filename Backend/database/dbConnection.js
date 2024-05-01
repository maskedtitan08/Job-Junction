import mongoose from "mongoose"

export const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"JOB_JUNCTION_DATABASE",
    }).then(()=>{
        console.log("Database Connected Successfully")
    }).catch((err)=>{
        console.log(`Error occured :  ${err}`)
    })
}

// export default  dbConnection;