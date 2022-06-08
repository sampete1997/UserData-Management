import './style.css'
import react from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axiosConn from '../../webApiConfig';


const Axios = require('axios')


export default function UserLogin() {


    const [err, SetError] = useState('');
    const [success, SetSuccess] = useState('');
    const [spinner, setSpinner] = useState('none')
    const [logInBtnStatus, setLogInBtnStatus] = useState(false)
    const navigate = useNavigate();
    const userName = useSelector((state) => state.login.userName)


    const userEmail = useSelector((state) => state.login.userId)

    const userMobileNo = useSelector((state) => state.login.password)

    const dispatch = useDispatch()

    function logMeIN() {

        let newData;

        if (userEmail == '' || userMobileNo == '') {

            SetError('Enter all the fields')

        }

        else {

            setLogInBtnStatus(true)

            axiosConn.post('/api/login', {
                email: userEmail,
                mobileNo: userMobileNo
            })
                .then((response) => {

                        SetError('')
                        
                        if (response.data[0]) {

                            SetSuccess('Loging in...')

                            dispatch({ type: 'getUserName', payload: response.data[0].name })

                            setSpinner('flex')

                            if (response.data[0].flag=='true') {

                                setTimeout(() => {

                                    return response.data[0].isAdmin == 'true' ? navigate('/showdb') : navigate('/loginSuccess')
                                    
                                }, 1500)
                            }

                            else{
                                SetError('Sorry! you are not allowed')
                                setSpinner('none')
                            }


                        }
                        else {

                            SetError('Email Id or mobile number invalid. Try again')
                        }
                    
                    setLogInBtnStatus(false)
                    return response.data
                })
                .catch((err) => {

                    if (err.response.data.message.details) {
                        SetError(err.response.data.message.details[0].message)
                    }
                    console.log(err)
                    setLogInBtnStatus(false)
                    return err
                })



        }


    }


    return (

        <div className="userLoginContainer">

            <div className="userLoginWrapper">
                <h2>Login</h2>

                <div>
                    <label className="lbl"> Email Id</label>
                    <input type='text' className='userip' placeholder='email id' onChange={(e) => dispatch({ type: 'getUserId', payload: e.target.value })}></input>
                </div>

                <div>
                    <label className='lbl'> Mobile No.</label>
                    <input type='number' className='userip' placeholder='mobile number' onChange={(e) => dispatch({ type: 'getPassword', payload: e.target.value })}></input>
                </div>

                {spinner == 'none' ? <button className='userLogInBtn' onClick={() => logMeIN()} disabled={logInBtnStatus}>Log In</button> : <div className='loader' style={{ display: { spinner } }}></div>}

                {err ? <p className='err'>{err} </p> : <p className='success'>{success}</p>}

            </div>

        </div>
    )
}