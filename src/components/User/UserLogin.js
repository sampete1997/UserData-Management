import './style.css'
import react from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axiosConn from '../../webApiConfig';
const Axios = require('axios')


export default function UserLogin() {


    const [err, SetError] = useState('')
    const navigate = useNavigate();
    const userName = useSelector((state) => state.login.userName)


    const userEmail = useSelector((state) => state.login.userId)

    const userMobileNo = useSelector((state) => state.login.password)

    const dispatch = useDispatch()

    async function logMeIN() {


        if (userEmail == '' || userMobileNo == '') {

            SetError('Enter all the fields')


        }

        else {


            let responseData = await axiosConn.get("/api/all")

            let newData = responseData.data

            for (let userId = 0; userId < newData.length; userId++) {

                if (newData[userId].email === userEmail) {


                    if (newData[userId].mobileNo === userMobileNo) {

                        SetError('')

                        if (newData[userId].flag === "true") {
                            dispatch({ type: 'getUserName', payload: newData[userId].name })

                            newData[userId].isAdmin == 'true' ? navigate('/showdb') : navigate('/loginSuccess')

                            dispatch({ type: 'getUserId', payload: '' })
                            dispatch({ type: 'getPassword', payload: '' })
                            break
                        }
                        else {

                            SetError('You are not allowed')
                            break
                        }

                    }
                    else {

                        SetError('Wrong UserId or Password')
                        break
                    }
                }

                if (userId === (newData.length) - 1) {
                    SetError('User not found')

                }

            }
        }

    }

    return (

        <div className="userLoginContainer">

            <div className="userLoginWrapper">
                <h2>Login</h2>

                <div>
                    <lable className="lbl"> User Name</lable>
                    <input type='text' className='userId' placeholder='username' onChange={(e) => dispatch({ type: 'getUserId', payload: e.target.value })}></input>
                </div>

                <div>
                    <lable className='lbl'> Password</lable>
                    <input type='password' className='userPassword' placeholder='password' onChange={(e) => dispatch({ type: 'getPassword', payload: e.target.value })}></input>
                </div>

                <button className='userLogInBtn' onClick={() => logMeIN()}>Log In</button>

                {err ? <p className='err'>{err} </p> : <p className='note'>Hit login</p>}

            </div>

        </div>
    )
}