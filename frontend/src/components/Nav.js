import React from 'react'
import { NavLink } from 'react-router-dom/dist'

function Nav() {
  return (
    <div className="nav">
        <h2 className='logo'>MiniNetflix</h2>
        <NavLink className="navLink" to="/in/login"><h3>Sign In</h3></NavLink>
    </div>
  )
}

export default Nav