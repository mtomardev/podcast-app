import React, { useState } from 'react'
import Header from '../components/common/Header'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import InputComponent from '../components/common/Input';
import Button from '../components/common/Button'
import FileInput from '../components/common/Input/FileInput'
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';


const CreateAnEpisode = () => {
    const {id} = useParams()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [audioFile, setAudioFile] = useState("");
    
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const audioFileHandle = (file) =>{
        setAudioFile(file);
    };
    
    const handleSubmit = async() =>{
        setLoading(true) 
        if(title,description,audioFile, id){
            
            try {
                //uploading epise
                //creating folder podcast-episode
                //inside under folder auth.currentUser.uid
                //file name Date.now
                const audioRef = ref(storage, `podcast-episode/${auth.currentUser.uid}/${Date.now()}`);
                
                //iploading file
                await uploadBytes(audioRef, audioFile)
                
                //geting audio URL
                const audioURL = await getDownloadURL(audioRef);
                
                //creating data for collection
                const episodeData = {
                    title: title,
                    description: description,
                    audioFile: audioURL
                };

                //creating collection
                //creating a collection in our db/ database called podcast
                //inside that we have our podcast id
                //episodes is a collection name inside that
                await addDoc(collection(db, 'podcast', id, "episedes" ),
                    //data passing
                    episodeData
                );
                toast.success("Episode Created Successfully");
                setLoading(false)
                navigate(`/podcast/${id}`)
                setTitle('')
                setDescription('')
                setAudioFile()

            } catch (error) {
                toast.error(error.message);
                setLoading(false)
            }
        }
        else{
            toast.error("All File Should be there")
            setLoading(false)
        }
    }

  return (
    <div>
      <Header/>
      <div className='input-wrapper'>
        <h1>Create An Episode</h1>
        <InputComponent state={title} 
        setState={setTitle} required={true} 
        placeholder="Title Name" type="text" />

        <InputComponent state={description} 
        setState={setDescription}
        required={true} 
        placeholder="Description" type="text" />

        <FileInput accept={"audio/*"} 
        id="audio-file-input" 
        fileHandleFnc={audioFileHandle} 
        text={"Upload Audio File"}  />

        <Button text={loading ? "Loading...": "Create Episode"} 
        onClick={handleSubmit}/>


      </div>
    </div>
  )
}

export default CreateAnEpisode
