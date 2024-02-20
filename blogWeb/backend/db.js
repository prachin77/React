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
    username : String,
    email : String ,
    password : String ,
})

const userModel = mongoose.model("users",userSchema)


// REGISTER 
app.post("/register", (req, res) => {
    console.log(req.body)
    console.log("Received registration data:", req.body);
    const { username , email, password } = req.body;
    userModel.create({ username , email, password })
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
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password });
        if (user) {
            console.log("user from mongodb = ", user);
            console.log("username from mongodb : ", user.username);
            res.json({ username: user.username, email: user.email , password : user.password});
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
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


