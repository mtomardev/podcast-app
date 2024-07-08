import React, { useState } from "react";
import Header from "../components/common/Header";
import InputComponent from "../components/common/Input";
import Button from "../components/common/Button";
import SignupForm from "../components/SignupComponent/SignUpForm";
import LoginForm from "../components/SignupComponent/LoginForm";


function SignUpPage(){
    
    const [flag, setFlag] = useState(false)


    
    return<div >
        <Header/>
        <div className="input-wrapper">
            
            {
                !flag ? <h1>Signup</h1> : <h1>Login </h1>
            }
    
        {/* Both condition will work */}
        {/* {
            flag !== true ? <SignupForm/>:<></>
        } */}

        {
            !flag  ? <SignupForm/>:<LoginForm/>
        }
        
        {
            !flag ? <p onClick={() => setFlag(!flag)}>Click here if you already have an Account. Login.</p> : <p onClick={() => setFlag(!flag)}>Click here if you don't have an Account. Signup.</p>
        }
        
        </div>
    </div>
}
export default SignUpPage
