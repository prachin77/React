let value = false
console.log(value);

// import express, { json } from "express";
// import { connect } from "mongoose";
// import cors from "cors";

// const express = require("express")
// const mongoose = require("mongoose")
// const cors = require("cors")

import express, { json } from "express";
import mongoose, { connect } from "mongoose";
import cors from "cors";


const app = express()
// app.use(json())
app.use(express.json())
app.use(cors())


connect("mongodb://127.0.0.1:27017/info")

const userSchema = new mongoose.Schema({
    id : String ,
    email : String ,
    password : String 
})

const userModel = mongoose.model("users",userSchema)

// app.post("/register",(req , res) => {
//     console.log("Received registration data:", req.body);
//     userModel.create(req.body)
//     .then(users => res.json(users))
//     .catch(err => res.json(err))
// })   

app.post("/register", (req, res) => {
    console.log("Received registration data:", req.body);
    const { email, password } = req.body;
    userModel.create({ email, password })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


// app.get("/register", (req, res) => {
//     // Handle GET requests for the /register endpoint
//     // This could be used for rendering a registration form or providing information

//     res.send("This is the registration page");
// });


app.get("/register", async (req, res) => {
    try {
        // Fetch all users from MongoDB
        const users = await userModel.find();

        // Send the user data as a JSON response
        res.json(users);
    } catch (error) {
        // Handle any errors that may occur during the database query
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(3001,() => {
    console.log("server is running");
})


// app.listen(3001,() => {
    // console.log("server is running");
// })