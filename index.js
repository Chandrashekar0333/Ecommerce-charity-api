const express=require("express")
const env=require("dotenv").config()
const mongoose = require("mongoose");
let userRouter=require("./routes/user")

const app=express()
app.use(express.json())

let port=process.env.PORT || 8080

function connectToDB(){
    try{
        mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce_charity");
        console.log("✅ connected to DB");
    }catch(err){
        console.log("❌ Error in connecting to mongoDB",err.message);
    }
}
app.get("/",(req,res)=>{
    res.send("hello world")
})

app.use("/api/users",userRouter)
app.listen(port,()=>{
    connectToDB()
    console.log("server running on port 3000");
})