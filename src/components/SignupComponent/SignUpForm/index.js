import React, { useState } from 'react'
import InputComponent from '../../common/Input';
import Button from '../../common/Button';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignupForm() {
    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const navigate = useNavigate() //navigate to page
    const dispatch = useDispatch()

    const handleSignup = async() =>{
        console.log("handleSignup")
        //creating user account
        if(password == confirmpassword && password.length >= 6){
            try{
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                //auth , email password will provide user 
                const user = userCredential.user;
                console.log("user", user)

                
            //<------------------------------------------>
            //saveing user details to firestore
            //setDoc is a setter mean seting a document
            //doc is like a class name or creating a doc
            //where are we creating we are creating in db
            //user is the name of the collection in FireBase where we are adding details
            //user.uid this is a document ID
            await setDoc(doc(db,"user", user.uid),{
                name: fullname,
                email: user.email,
                uid: user.uid
            })

            //<------------------------------------------>
            //saving data in redux
            //setUser is coming from userSlice
            dispatch(setUser({
                name: fullname,
                email: user.email,
                uid: user.uid
            }))
            toast.success("User has been created")
            //every time when we signup it will take us to signup page
            navigate("/profile") 
            }
            catch(e){
                console.log("error", e)
            }
        }
        else{
            //throw an error
            if(password !== confirmpassword){
                toast.error("Password did not match")
            }
            else if(password.length < 6){
                toast.error("Password length should be more than 5")
            }
        }
        
    }

  return (
    <div>
        
        <InputComponent state={fullname} setState={setFullName} required={true} 
        placeholder="Full Name" type="text" />

        <InputComponent state={email} setState={setEmail} required={true} 
        placeholder="Email" type="text" />

        <InputComponent state={password} setState={setPassword} required={true} 
        placeholder="Password" type="password" />

        <InputComponent state={confirmpassword} setState={setConfirmPassword} required={true} 
        placeholder="Confirmpassword" type="password" />

        <Button text={"Signup"} onClick={handleSignup}/>
    </div>
  )
}

export default SignupForm
