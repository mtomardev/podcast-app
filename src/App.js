
import {BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/SignUp';
import Profile from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivaeRoutes from './components/common/PrivaeRoutes';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from './firebase';
import { useDispatch } from 'react-redux';
import { setUser } from './slices/userSlice';
import CreateAPodcast from './pages/CreateAPodcast';
import PodcastsPage from './pages/Podcasts';
import PodcastDetails from './pages/PodcastDetails';
import CreateAnEpisode from './pages/CreateAnEpisode';

function App() {
  const dispatch = useDispatch()
  
  // if user authenticate once he don't need to login again and again
  // this will avilable in all pages 
  useEffect(() =>{
    //UnsubscribeAuth is using onAuthStateChanged from firebase auth 
    //this user in onAuthStateChanged is current authentic user
    const UnsubscribeAuth = onAuthStateChanged(auth, (user) =>{
      if(user){

        //onSnapshot triger when something change in our intier docment
        const unsubscriveSnapshot = onSnapshot(
          doc(db, "user", user.uid),
          (userDoc) => {
            if(userDoc.exists()){
              const userData = userDoc.data(); //this data function return data as an object
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid
                })
              );
            }
          },
          (error) => {
            console.error("Error fetching user data:", error);
          }
        );
        return()=>{
          unsubscriveSnapshot();
         };
      }
    }); 

    return () =>{
      UnsubscribeAuth();  //calling this function
  };
},[]);

  return (
    <div className="App">
      <ToastContainer/>
      
      <Router>
        <Routes>
          <Route path='/' element={<SignUpPage/>}/>
          <Route element={<PrivaeRoutes/>}>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/create-a-podcast' element={<CreateAPodcast/>}/>
            <Route path='/podcast' element={<PodcastsPage/>}/>
            <Route path='/podcast/:id' element={<PodcastDetails/>}/>
            <Route path='/podcast/:id/create-episode' element={<CreateAnEpisode/>}/>
          </Route>
          
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
