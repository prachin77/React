// firebase imports 
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    fetchSignInMethodsForEmail
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// react imports
import React, { useState } from "react";
import Header from "../components/header";
import Register from "../components/register";

const Login = () => {

    const [regMode, setRegMode] = useState(true);
    const [userState, setUserState] = useState("Login");

    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");

    const [logEmail, setLogEmail] = useState("");
    const [logPassword, setLogPassword] = useState("");

    // state to check current user 
    const [user, setUser] = useState();

    const navigate = useNavigate();

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    });

    const loginUser = async () => {
        let storeUserInfo = "";
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                regEmail,
                regPassword
            );

            window.alert("user logged in 😎")
            console.log("user details : ", userCredential.user);
            navigate("/");
            return userCredential.user.uid;
        } catch (error) {
            window.alert("user not found 😭")
        }
    }

    const checkUserFromDatabase = (value) => {
        axios.post("http://localhost:3001/login",{userid : value , email : regEmail , password : regPassword})
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

    const handleLoginButton = async () => {
        const value = await loginUser();
        checkUserFromDatabase(value)
    }


    return (

        <div class="container mx-auto p-8 bg-gray-100 rounded-lg shadow-md max-w-md">
            <h3 class="text-3xl font-bold text-center mb-6 text-black">Login</h3>
            <p>
                dont't have account ? { }
                <Link to="/register">register</Link>
            </p><br />

            <div class="mb-6">
                <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
                <input type="email" id="email" placeholder="Enter email"
                    class="mt-1 p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(event) => {
                        setRegEmail(event.target.value);
                    }}
                />
            </div>

            <div class="mb-6">
                <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
                <input type="password" id="password" placeholder="Password"
                    class="mt-1 p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(event) => {
                        setRegPassword(event.target.value);
                    }}
                />
            </div>
            <button onClick={handleLoginButton}
                className="bg-black text-white py-3 px-6 rounded hover:bg-gray-600 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800 mr-5">
                Login
            </button>
        </div>

    );
}

export default Login;