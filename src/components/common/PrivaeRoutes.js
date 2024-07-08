
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from './Loader';


const PrivaeRoutes = () => {
  //react firesbase hook we are geting 3 states
  //user : current user
  //loading : to fetch data
  //error: error msg
    const [user, loading, error] = useAuthState(auth); //react firesbase hook

    //if loading is there return loading
      if (loading){
        return <p><Loader/> </p>          
      }
      //if user is not there or got error nevigate to home page and replace page
      else if(!user || error){
        return <Navigate to="/" replace/>
      }

      //if there is user
      //outlet: what ever is the route inside private route we can acces them
      else{
        return <Outlet/>
      }
}

export default PrivaeRoutes
