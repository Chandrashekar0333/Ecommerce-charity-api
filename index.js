const express=require("express")
const env=require("dotenv").config()
const app=express()

let port=process.env.PORT || 8080
app.get("/",(req,res)=>{
    res.send("hello world")
})
app.listen(port,()=>{
    console.log("server running on port 3000");
})