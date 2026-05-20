"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "../styles/auth.css";
import Link from "next/link";

export default function AuthPage() {
    const [active, setActive] = useState(false);
    const handleAnimation =()=>{
        if (active==true){
            wrapper.className.add("active")
        }
    }
return (
    <div>
        <div className="wrapper">
        <span className="bg-animate"></span>
        <span className="bg-animate2"></span>

            <div className="form-box login">
                <h2 >Login</h2>
                <form>
                    <div className="input-box ">
                        <input type="text" required/>
                        <label>Username</label>
                    </div>
                    <div className="input-box ">
                        <input type="password" required/>
                        <label>Password</label>
                    </div>
                    <button type="submit" className="btn ">Login</button>
                    <div className="logreg-link ">
                        <p>Don't have an account? <a href="" className="register-link" onClick={(e) => {
                            e.preventDefault();
                            setActive(true);
                            }}>Sign up</a></p>
                    </div>
                </form>
            </div>
            <div className="info-text login">
                <h2>Welcome Back!</h2>
                <p>Sign in to continue your journey.</p>
            </div>

            <div className="form-box register">
                <h2>Sign Up</h2>
                <form>
                    <div className="input-box">
                        <input type="text" required/>
                        <label>Username</label>
                    </div>
                    <div className="input-box">
                        <input type="email" required/>
                        <label>Email</label>
                    </div>
                    <div className="input-box">
                        <input type="password" required/>
                        <label>Password</label>
                    </div>
                    <button type="submit" className="btn">Sign Up</button>
                    <div className="logreg-link">
                        <p>Already have an account? <a href="" className="login-link" onClick={(e) => {
                            e.preventDefault();
                            setActive(false);
                            }}>Log in</a></p>
                    </div>
                </form>
            </div>

            <div className="info-text register">
                <h2>Welcome Back!</h2>
                <p>Sign in to continue your journey.</p>
            </div>
        </div>
    </div>
);
}