import React from 'react'
import './style.css'
import { NavLink } from 'react-router-dom'


function Header() {
  return (
    <div className='navbar'>
      <div className='gradient'></div>
      <div className='links'>
        <NavLink to="/">Signup</NavLink>
        <NavLink to="/podcast">Podcast</NavLink>
        <NavLink to="/create-a-podcast">State A Podcast</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
      
    </div>
  )
}

export default Header
