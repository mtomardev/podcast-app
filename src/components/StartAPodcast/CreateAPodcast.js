import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import InputComponent from '../common/Input'
import Button from '../common/Button'
import FileInput from '../common/Input/FileInput'
import { toast } from 'react-toastify'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { auth, db, storage } from '../../firebase'
import { addDoc, collection } from 'firebase/firestore'

function CreateAPodcastForm() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [displayImage, setDisplayImage] = useState()
    const [bannerImage, setBannerImage] = useState()
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async() =>{
      if(title && desc && displayImage && bannerImage){
        //1. Upload files ==> get downloaded link
        try {
          //for banner image
          //if we will use name instead of auth.currentUser.uid image will be replace again and agin because name is not updating
          // const bannerImageRef = ref(storage, `podcast-banner-image`)
          //auth.currentUser.uid folder name inside podcast folder
          //file name will be Date.now()
          //that's why used auth.currentUser.uid it will give unique name
          const bannerImageRef = ref(storage, 
            `podcast/${auth.currentUser.uid}/${Date.now()}`) //this is the location where image will be save

          //upload Image
          await uploadBytes(bannerImageRef, bannerImage);
          toast.success("Uploaded")
          //baner imageURL fetch
          const bannerImageUrl = await getDownloadURL(bannerImageRef)
          console.log(bannerImageUrl)
          
          //for display image
          const displayImageRef = ref(storage, `podcast/${auth.currentUser.uid}/${Date.now()}`)
          await uploadBytes(displayImageRef, displayImage);
          toast.success("Uploaded")
          const displayImageUrl = await getDownloadURL(displayImageRef)
          console.log(displayImageUrl)

          //podcast creation in firestore Database
          const podcastData = {
            title: title,
            description : desc, 
            bannerImage : bannerImageUrl,
            displayImage : displayImageUrl,
            createdBy : auth.currentUser.uid
          }

          const docRef = await addDoc(collection(db, "podcast"), podcastData);
            toast.success("Podcast created");
            
          //set every thing back
            setTitle("")
            setDesc("")
            setBannerImage(null)
            setDisplayImage(null)


        } 
        
        
        catch (error) {
          toast.error(error.message)
        }

      }
      else{
        toast.error("Plaese Enter all values")
      }
    }

    const displayImageHandle = (file) =>{
      setDisplayImage(file);                                                                                  
    }

    const bannerImageHandle = (file) =>{
      setBannerImage(file);                                                                                  
    }

  return (
    <div>
        
      <InputComponent state={title} setState={setTitle} required={true} 
        placeholder="Title" type="text" />

    <InputComponent state={desc} setState={setDesc} required={true} 
        placeholder="Description" type="text" />
    

    {/* custom input check input folder in common */}
    <FileInput accept={"image/*"} id="Display Image" 
    fileHandleFnc={displayImageHandle} text={"Display Image Upload"}  />

        {/* image/*  all file i can accept */}
        <FileInput accept={"image/*"} id="Banner Image" 
        fileHandleFnc={bannerImageHandle} text={"Banner Image Upload"} />
    
    <Button text={"Create Podcast"} onClick={handleSubmit}/>
    </div>
  )
}

export default CreateAPodcastForm
