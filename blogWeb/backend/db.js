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
    userid : String ,
    email : String ,
    password : String ,
})

const userModel = mongoose.model("users",userSchema)

// app.post("/register",(req , res) => {
//     console.log("Received registration data:", req.body);
//     userModel.create(req.body)
//     .then(users => res.json(users))
//     .catch(err => res.json(err))
// })   


// REGISTER 
app.post("/register", (req, res) => {
    console.log("Received registration data:", req.body);
    const { userid, email, password } = req.body;
    userModel.create({ userid, email, password })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

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



// LOGIN
app.post("/login",(req , res) => {
    const {userid , email , password} = req.body;
    userModel.findOne({userid})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("login succesfull from mongo server")
            }
            else{
                res.json("password incorrect")
            }
        }
        else{
            res.json("no user record found")
        }
    })
});

app.get("/login", async (req, res) => {
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


