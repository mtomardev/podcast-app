import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import Loader from '../components/common/Loader';

function Profile() {

//state is golbal state 1- user is userSlice name is user, 2nd user is initialState obj
    //if you don't have object you directly have data than this will state.data
    const user = useSelector((state) => state.user.user);
    console.log("My User Details", user );
    if(!user){
      return <p><Loader/></p>
    }

    const handleLogOut = () =>{
      signOut(auth).then(()=>{
        toast.success("User Logged Out")
      })
      .catch((error)=>{
        toast.error(error.message)
      })
    }
  return (
    <div>
        <Header/>
        <h1>{user.name}</h1>
        <h2>{user.email}</h2>
        <h2>{user.uid}</h2>
        <Button text={"LogOut"} onClick={handleLogOut}/>
    </div>
  )
}

export default Profile
