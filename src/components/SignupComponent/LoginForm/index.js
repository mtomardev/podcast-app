import React, { useState } from 'react'
import InputComponent from '../../common/Input';
import Button from '../../common/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../slices/userSlice';

function LoginForm() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async() =>{
        console.log("handle Login...")
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        //creating user
        const user = userCredential.user;

        //geting details from doc
        const userDoc = await getDoc(doc(db,"user", user.uid));
        const userData = userDoc.data();
        console.log("userData", userData)

        //setUser is coming from userSlice
        //using dispatch here because we have stored data of user who loged in
        //this data can be fetch in profile page 
        dispatch(setUser({
            name : userData.name,
            email: userData.email,
            uid: userData.uid,

        }) )

        navigate('/profile')

    }

  return (
    <div>
        

        <InputComponent state={email} setState={setEmail} required={true} 
        placeholder="Email" type="text" />

        <InputComponent state={password} setState={setPassword} required={true} 
        placeholder="Password" type="password" />


        <Button text={"Login"} onClick={handleLogin}/>
    </div>
  )
}

export default LoginForm
