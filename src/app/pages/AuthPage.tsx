'use client'
import { useEffect, useState } from "react"
import Login from "../components/AuthComponents/Login"
import Signup from "../components/AuthComponents/Signup"

const AuthContainer = () => {
    
  return (
    
    <div className="flex justify-center align-middle m-5 p-5">
        <div className="border border-primary rounded m-5 p-5">
            <ul className="nav justify-center nav-pills" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="registration-tab" data-bs-toggle="tab" data-bs-target="#registration" type="button" role="tab" aria-controls="home" aria-selected="true">Sign Up</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="false">Login</button>
                </li>
            </ul>

            <div className="tab-content">
                <div className={`tab-pane active`} id="registration" role="tabpanel" aria-labelledby="registration-tab"><Signup /></div>
                <div className={`tab-pane`} id="login" role="tabpanel" aria-labelledby="login-tab"><Login /></div>
            </div>
        </div>        
    </div>

  )
}

export default AuthContainer
