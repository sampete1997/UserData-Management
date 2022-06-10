import './style.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'



export default function AdminNavBar2() {

    const dispatch = useDispatch()

    return (
        <div className='navBarContainer2'>

            <Link to='/' className='links'><p >Home</p></Link>
            <Link to='/loginSuccess' className='links'><p >Profile</p></Link>
            <Link to='/showdb' className='links'><p >ShowUserData</p></Link>
            <Link to='/userLogin' className='links' onClick={() => {

                localStorage.setItem('username', '')
                localStorage.setItem('userDetails', '' )
                return dispatch({ type: 'getUserName', payload: localStorage['username'] || '' })
            }

            }><p >Log Out</p></Link>


        </div>
    )
}