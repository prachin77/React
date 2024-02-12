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
import React, { useState , useEffect } from "react";
import Header from "../components/header";

const Register = () => {
    const [regMode, setRegMode] = useState(true);
    const [userState, setUserState] = useState("Login");

    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");

    const [logEmail, setLogEmail] = useState("");
    const [logPassword, setLogPassword] = useState("");

    const navigate = useNavigate();


    // onAuthStateChanged(auth, (currentUser) => {
        // setUser(currentUser.uid)
        // console.log("current user id : ",user);
        // if (currentUser) {
        //     setFirebaseUserId(currentUser.uid);  // Set Firebase user ID if the user is authenticated
        //     console.log("firebase user id : ",firebaseUserId);
        // }
    // });

    const registerUser = async () => {
        let i;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, regEmail, regPassword);
            window.alert("User already exists. Please choose a different email or login directly.");
            setRegMode(false);
        } 
        catch (error) {        
            if (error.code === "auth/user-not-found") {
                const user = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
                window.alert("User created successfully!");
                setRegMode(false); 
            }
        }
        try {
            if (regPassword.length < 6) {
                window.alert("Password must be at least 6 characters long");
                return;
            }
            for (i = 0; i < regPassword.length; i++) {
                if (regPassword[i] === " ") {
                    window.alert("Password cannot contain spaces");
                    return;
                }
            }

            const userRegisterCredential = await createUserWithEmailAndPassword(
                auth,
                regEmail,
                regPassword
            );
            console.log(userRegisterCredential.user.uid);
            window.alert("user added : ");
            setRegMode(false);
            navigate('/login');
            return userRegisterCredential.user.uid;
        } catch (error) {
            window.alert("error");
        }
    }
    
    
    const sendDataToServer = (value) => {
        axios.post('http://localhost:3001/register', {  userid : value, email : regEmail,  password : regPassword })
            .then(result => console.log(result))
            .catch(err => console.log(err))
    }
    

    const handleRegButton = async () => {
        const value = await registerUser();
        sendDataToServer(value)
    }
    

    return (
        <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-md max-w-md">
            <h3 class="text-3xl font-bold text-center mb-6 text-black">Register</h3>
            <div class="mb-6">
                <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
                <input type="email" id="email" placeholder="Enter email" autoComplete="off"
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
            <button onClick={handleRegButton}
                className="bg-black text-white py-3 px-6 rounded hover:bg-gray-600 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800 "
            >
                Register
            </button>
        </div>
    );
}

export default Register;