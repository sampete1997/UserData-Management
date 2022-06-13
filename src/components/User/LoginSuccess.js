import './style.css'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

export default function LoginSuccess() {

    const dispatch = useDispatch()
    const [userPic, SetUserPic] = useState('')
    let UserDetails


    UserDetails = localStorage.getItem('userDetails')=='' ? {} : JSON.parse(localStorage.getItem('userDetails'))
    
    console.log('details', Object.values(UserDetails));

    useEffect(() => {

        SetUserPic(String(process.env.REACT_APP_URL) + '/images/' + UserDetails.photo)

    }, [UserDetails])

    return (
        <div className='loginSuccessWrapper'>

            <h1>WELCOME {(UserDetails.name).toUpperCase()} </h1>

            <div className='loginSuccessContainer'>
                <img src={userPic} height={280} width={300} alt={''}></img>
                <div>
                    <h3>Name:&nbsp; {(UserDetails.name)} </h3>
                    <h3>Age:&nbsp;{UserDetails.age}</h3>
                    <h3>Mobile No:&nbsp;{UserDetails.mobileNo}</h3>
                    <h3>Email Id:&nbsp;{UserDetails.email}</h3>
                </div>
            </div>

        </div>
    )
}