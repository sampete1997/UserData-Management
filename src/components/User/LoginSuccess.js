import './style.css'
import React from 'react'
import { useSelector,useDispatch } from 'react-redux'

export default function LoginSuccess(){

  
    const userName = useSelector((state) => state.login.userName)
    
    
    return (
        <div className='loginSuccessContainer'>

            <h1>Welcome {userName} </h1>
            <img src='https://assets.materialup.com/uploads/9ba2d687-d7d3-4361-8aee-7b2a3c074761/preview.gif' height={400} width={600} ></img>
        </div>
    )
}