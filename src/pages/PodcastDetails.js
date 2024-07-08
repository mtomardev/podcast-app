import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import { useNavigate, useParams } from 'react-router-dom'
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import Button from '../components/common/Button/index'
import EpisodesDetails from '../components/common/Podcasts/PodcastCard/EpisodesDetails';
import AudioPlayer from '../components/common/Podcasts/AudioPlayer';

const PodcastDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [podcast, setPodcast] = useState({});
    const [episodes, setEpisodes] = useState([])
    const [playingFile, setPlayingFile] = useState("")
    console.log("ID", id)

    useEffect(()=>{
        if(id){
            getData()
        }
 
    },[id])

    const getData = async() =>{
        try{
            const docRef = doc(db, "podcast", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setPodcast({id: id, ...docSnap.data()})
            
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            toast.error("No such document!");
            navigate('/podcast');
        }
        }
        catch(e){
            toast.error(e.message);
        }
    }




 //fetch all Episeds from podcast firebase   
 useEffect(()=>{
  const unsubscribe = onSnapshot(
   //making query , we want to get the collection from db and collection is called
   // podcast id is inside and episedes where episodes is uploaded
   query(collection(db, 'podcast', id, "episedes")),

   (querySnapshot) => { //what ever data we are getting that is insede querySnapshot
     const episodesData = []; //episodes data
     querySnapshot.forEach((doc) => { //foreach forloop what ever data is there inside doc push that data in episodeData array
      episodesData.push({id: doc.id, ...doc.data() });
     });
     
     console.log("episodesData", episodesData)
     setEpisodes(episodesData);
   },
   (error) => {
     console.error("Error fetching podcasts:", error )
   }
  );
  return() =>{
   unsubscribe();
  }
},[id]);


  return (
    <div>
      <Header/>
      <div className='input-wrapper' style={{marginTop: "2rem", marginBottom: "3.5rem"}}>
      {podcast.id &&
      <>
      <div style={{display:"flex", 
        justifyContent:"space-between", 
        alignItems:"center",
        width:"100%",
        }}>
      <h1 className='podcast-title-heading' >{podcast.title}</h1>
        {podcast.createdBy === auth.currentUser.uid &&
        ( <Button
        width={"200px"}
        text={"Create Episode"} 
        onClick={()=>{navigate(`/podcast/${id}/create-episode`)}}
        />)}
      </div>
        <div className="banner-wrapper"><img src={podcast.bannerImage} alt=''/></div>
        <p className='podcast-description'>{podcast.description}</p>
        <h1 className='podcast-title-heading'>Episodes</h1>
        {episodes.length> 0 ? <>{episodes.map((episode, index)=>{
          return <EpisodesDetails key={index} 
          index = {index + 1}
          title={episode.title} description={episode.description}
          audioFile={episode.audioFile}
          onClick={(file) => setPlayingFile(file) }/>
        })}</> : <p>No Episodes Found</p> }
      </>
      }
      </div>
      
      {
        // if there is playingFile than audiofile will be visible
        playingFile && <AudioPlayer audioSrc = {playingFile}
        image={podcast.displayImage}/>
      }
      
    </div>
  )
}

export default PodcastDetails
