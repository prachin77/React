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

    // const register = async () => {
    //     let i;
    //     // if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(regPassword)) {
    //     //     window.alert("Password must be at least 6 characters long and contain a lowercase, uppercase, digit, and special symbol.");
    //     //     return;
    //     // }
    //     try {
    //         // Attempt to sign in with the provided email and password
    //         const userCredential = await signInWithEmailAndPassword(auth, regEmail, regPassword);

    //         // User already exists (handle appropriately)
    //         window.alert("User already exists. Please choose a different email or login directly.");
    //         setRegMode(false); 
    //     } catch (error) {
    //         // If sign-in fails, assume it's due to non-existent user and proceed with registration
    //         if (error.code === "auth/user-not-found") {
    //             const user = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
    //             window.alert("User created successfully!");
    //             setRegMode(false); // If applicable, redirect or display success message
    //         } 
    //         // else {
    //         //     // Handle other errors (e.g., weak password, network issues)
    //         //     window.alert("An error occurred. Please try again later.");
    //         //     console.error(error);
    //         // }
    //     }
    //     try {
    //         if (regPassword.length < 6) {
    //             window.alert("Password must be at least 6 characters long");
    //             return;
    //         }
    //         for (i = 0; i < regPassword.length; i++) {
    //             if (regPassword[i] === " ") {
    //                 window.alert("Password cannot contain spaces");
    //                 return;
    //             }
    //         }

    //         const user = await createUserWithEmailAndPassword(
    //             auth,
    //             regEmail,
    //             regPassword
    //         );
    //         window.alert("user added");
    //         setRegMode(false);  
    //         setRegEmail("");
    //         setRegPassword("");
    //         // <Header {...regMode}/>
    //         // console.log("user details", user);
    //         // console.log(auth.currentUser.email);
    //         // navigate('/home');
    //     } catch (error) {
    //         window.alert("error");
    //     }
    // }

    const login = async () => {
        let storeUserInfo = "";
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                regEmail,
                regPassword
            );
            window.alert("user logged in 😎")
            // const userInfo = `User email - ${auth.currentUser.email}, User id - ${auth.currentUser.uid}`;
            console.log("user details : ", user);
            navigate("/home");
        } catch (error) {
            window.alert("user not found 😭")
        }
    }

    const logout = async () => {

    }

    // const sendDataToServer = (event) => {
    //     axios.post('http:localhost:3001/register',{email : regEmail , password : regPassword})
    //     .then(result => console.log(result))
    //     .catch(err => console.log(err))
    // }

    // const handleRegButton = async () =>{
    //     await register(),
    //     sendDataToServer
    // }

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
            <button onClick={login}
                className="bg-black text-white py-3 px-6 rounded hover:bg-gray-600 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800 mr-5">
                Login
            </button>
            {/* <button onClick={handleRegButton}
                className="bg-black text-white py-3 px-6 rounded hover:bg-gray-600 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800 ">
                Register
            </button>
            <Header /> */}
            {/* {auth.email+" "+auth.uid+" "+auth.regPassword} */}
        </div>

    );
}

export default Login;