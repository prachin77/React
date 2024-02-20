import React, { useState } from "react";
import {auth} from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {useNavigate} from "react-router-dom"
import axios from "axios";

const initialState = {
    username: "",
    email: "",
    password: ""
}

const Auth = () => {
    const [state, setState] = useState(initialState)
    const [signUp, setSignUp] = useState(false)
    const { email, password, username } = state;
    const navigate = useNavigate();

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const sendSignupDataToServer = () => {
        axios.post("http://localhost:3001/register",{username , email , password})
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

    // const getSigninDataFromServer = () => {
    //     axios.post("http://localhost:3001/login",{username , email , password})
    //     .then(result => {
    //         alert("user details coming from server")
    //         console.log("frontend user details coming from backend");
    //         console.log("username = ",result.data.username);
    //         console.log("email = ",result.data.email);
    //         console.log("password = ",result.data.password);
    //     })
    //     .catch(err => console.log(err))
    // }
    const getSigninDataFromServer = () => {
        axios.post("http://localhost:3001/login", { email, password })
            .then(result => {
                alert("user details coming from server")
                console.log("frontend user details coming from backend");
                console.log("username = ", result.data.username);
                console.log("email = ", result.data.email);
                console.log("password = ", result.data.password);
            })
            .catch(err => console.log(err))
    }
    

    const handleAuth = async (event) => {
        event.preventDefault();
        if(!signUp){
            if(email && password){
                const {user} = await signInWithEmailAndPassword(auth , email , password);
                alert("login succesfull")
                console.log("login user details : ",{
                    uid : user.uid,
                    email : user.email,
                    displayName : user.displayName
                });
                getSigninDataFromServer();
                navigate("/")
            }
            else{
                alert("Error during signin. Please try again.");
            }
        }
        else{
            if (password.length < 6) {
                alert("Password must be at least 6 characters long");
                return; // Stop execution if password is too short
            }``
            try {
                const { user } = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(user, { displayName: `${username}` });

                // Alert for successful signup
                alert("User added successfully");

                // Log user details to the console
                console.log("User Details:", {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                });
                // while singup user data is send to db
                sendSignupDataToServer();
            } catch (error) {
                console.error("Error during signup:", error.message);
                alert("Error during signup. Please try again.");
            }
        }
        navigate("/");
    }

    return (
        <div className="container mx-auto my-8">
            <div className="max-w-md mx-auto bg-white p-8 border rounded shadow">
                <div className="text-center mb-4">
                    <div className="text-2xl font-semibold">
                        {!signUp ? "Sign In" : "Sign Up"}
                    </div>
                </div>
                <form className="space-y-4" onSubmit={handleAuth} >
                    {signUp && (
                        <>
                            <div>
                                {/* <label htmlFor="username">Username</label> */}
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    placeholder="Enter username"
                                    name="username"
                                    value={username}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}
                    {/* email field  */}
                    <div>
                        {/* <label htmlFor="email">Email</label> */}
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter Email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    {/* password field  */}
                    {/* <label htmlFor="password">Password</label> */}
                    <div>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter Password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="text-center">
                        <button
                            className={`w-full bg-black  text-white py-2 rounded-md`}
                            type="submit"
                        >
                            {!signUp ? "Sign In" : "Sign Up"}
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    {!signUp ? (
                        <p className="text-sm font-medium">
                            Don't have an account?{" "}
                            <span
                                className="text-black cursor-pointer"
                                onClick={() => setSignUp(true)}
                            >
                                Sign Up
                            </span>
                        </p>
                    ) : (
                        <p className="text-sm font-medium">
                            Already have an account ?{" "}
                            <span
                                className="text-black cursor-pointer"
                                onClick={() => setSignUp(false)}
                            >
                                Sign In
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Auth;
