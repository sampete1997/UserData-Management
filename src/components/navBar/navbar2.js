import './style.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'



export default function NavBar2() {

    const dispatch = useDispatch()

    return (
        <div className='navBarContainer2'>

            <Link to='/' className='links'><p >Home</p></Link>

            <Link to='/userLogin' className='links' onClick={() => dispatch({ type: 'getUserName', payload: '' })
            }><p >Log Out</p></Link>


        </div>
    )
}