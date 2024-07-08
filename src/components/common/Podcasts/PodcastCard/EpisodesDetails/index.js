import React from 'react'
import './style.css'
import Button from '../../../Button'

const EpisodesDetails = ({index, title, description, audioFile, onClick}) => {
  return (
    <div style={{width: "100%"}}>
      <h1 style={{textAlign:"left", marginBottom:0}}>{index}. {title}</h1>
      <p style={{marginLeft: '1.5rem'}} className='podcast-description'>{description}</p>
      <Button text={"Play"} width={"200px"} 
      onClick={() => onClick(audioFile)}/>
    </div>
  )
}

export default EpisodesDetails
