import express from "express";
const app = express();
// const env = require("dotenv");
import dotenv from "dotenv"
dotenv .config(); /// Environment variables
import mongoose from "mongoose";
// const path = require("path");
import movies from "./api/movies.route.js"

// mongoose.connect(process.env.MOVIEREVIEWS_DB_RUI)
//     .then(() => {
//         console.log("Connection established...");
//     })
//     .catch((err) => {
//         console.log("Error " + err);
//     })

  
app.post("/api", movies)

app.get("/", (req,res)=>{
    res.send("Hello from the Shan side")
} )

// process.env.PORT
app.listen(3000, () => {
    console.log(`Server is running on Port ${process.env.PORT}`)
})


// import express from 'express'
// import cors from 'cors'
// import movies from './api/movies.route.js'
// const app = express()
// app.use(cors())
// app.use(express.json())
// app.use("/api/v1/movies", movies)
// app.use('*', (req,res)=>{
// res.status(404).json({error: "not found"})
// })
// export default app