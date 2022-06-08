import './style.css'
import React from 'react'
import { Link } from 'react-router-dom'



export default function NavBar() {



    return (
        <div className='navBarContainer'>

            <Link to='/' className='links'><p>Home</p></Link>
            <Link to='userSignUp' className='links'><p>Sign Up</p></Link>
            <Link to='userLogin' className='links'><p>Log In</p></Link>

        </div>
    )
}