import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { setPodcasts } from '../slices/podcastSlice';
import { collection, onSnapshot, query  } from 'firebase/firestore';
import {db} from "../firebase";
import PodcastCard from '../components/common/Podcasts/PodcastCard';
import InputComponent from '../components/common/Input';

function PodcastsPage() {
  
  
  
  //whenever dispacth is called useEffect will trigred
  const dispatch = useDispatch() 

  //to fetch data we need useSelector
  const podcasts = useSelector((state) => state.podcasts.podcasts)

  const [search, setSearch] = useState("");

  //fetch all Podcasts from podcaset firebase   
  useEffect(()=>{
       const unsubscribe = onSnapshot(
        //making query , we want to get the collection from db and collection is called podcast
        query(collection(db, "podcast")),
        (querySnapshot) => { //what ever data we are getting that is insede querySnapshot
          const podcastsData = []; //podcast data
          querySnapshot.forEach((doc) => { //for each every doc i get push that data in podcastData array
            podcastsData.push({id: doc.id, ...doc.data() });
          });
          //calling over dispatch  adding podcastsData array
          console.log(podcastsData)
          dispatch(setPodcasts(podcastsData));
        },
        (error) => {
          console.error("Error fetching podcasts:", error )
        }
       );
       return() =>{
        unsubscribe();
       }
    },[dispatch]);
    
    var filteredPodcasts = podcasts.filter((item) => item.title.trim().toLowerCase().includes(search.trim().toLowerCase()))

  return (
    <div>
        <Header/>
        <div className='input-wrapper' style={{marginTop: "2rem"}}>
            <h1>Discover Podcast</h1>
            <InputComponent state={search} setState={setSearch} required={true} 
        placeholder="Search by Title"  type="text" />
            {/* this podcasts came from useSelector */}
            {/* podcasts replaced with filteredPodcasts */}
            {filteredPodcasts.length > 0 ? (
          <div className='podcast-flex'>
          {
            filteredPodcasts.map((item) =>{
              return <PodcastCard 
              key={item.id}
              id={item.id}
              title={item.title}
              displayImage={item.displayImage}/>
            })
          }
          </div>
        ) : (
          <>{search ? "Podcast Not Found": "No Podcast"} </>
        )}
        </div>
    
    </div>
  )
}

export default PodcastsPage
