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
    const [mobileNoErr, SetMobileNoError] = useState('')
    const [emailErr, SetEmailError] = useState('')
    const [logInBtnStatus, setLogInBtnStatus] = useState(false)
    const navigate = useNavigate();
    const userName = useSelector((state) => state.login.userName)


    const userEmail = useSelector((state) => state.login.userId)

    const userMobileNo = useSelector((state) => state.login.password)

    const dispatch = useDispatch()


    function handleKeyPress(event) {

        if (event.key === 'Enter') {
            logMeIN()
        }
    }

    function logMeIN() {

        SetMobileNoError('')
        SetEmailError('')
        SetError('')

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



                        setSpinner('flex')

                        if (response.data[0].flag == 'true') {



                            localStorage.setItem('userDetails', JSON.stringify(response.data[0]))
                            
                            let UserDetails = JSON.parse(localStorage.getItem('userDetails'))
                            dispatch({ type: 'getUserDetails', payload: UserDetails })
                            console.log('lcl strh details', response.data[0]);
                            

                            setTimeout(() => {

                                return response.data[0].isAdmin == 'true' ? navigate('/showdb') : navigate('/loginSuccess')

                            }, 2000)
                        }

                        else {
                            SetError('Sorry! you are not allowed')
                            setSpinner('none')
                        }


                    }
                    else {

                        SetError('Wrong email Id or mobile number. Try again')
                    }

                    setLogInBtnStatus(false)
                    return response.data
                })
                .catch((err) => {

                    let errors = err.response.data.message.details
                    errors.map((errMsg) => {

                        console.log('errmsg', errMsg);

                        if ((errMsg.message).includes('mobileNo')) {
                            SetMobileNoError(errMsg.message)
                        }

                        if ((errMsg.message).includes('email')) {
                            SetEmailError('email must be valid')
                        }

                    })
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
                    <input type='text' className='userip' placeholder='email id' onChange={(e) => dispatch({ type: 'getUserId', payload: e.target.value })} onKeyDown={e => handleKeyPress(e)}></input>
                </div>

                {emailErr ? <p className='err'>{emailErr} </p> : <p className='note'>blankNote</p>}

                <div>
                    <label className='lbl'> Mobile No.</label>
                    <input type='number' className='userip' placeholder='mobile number' onChange={(e) => dispatch({ type: 'getPassword', payload: e.target.value })} onKeyDown={e => handleKeyPress(e)}></input>
                    {mobileNoErr ? <p className='err'>{mobileNoErr} </p> : <p className='note'>blankNote</p>}
                </div>

                {spinner == 'none' ? <button className='userLogInBtn' onClick={() => logMeIN()} disabled={logInBtnStatus} >Log In</button> : <div className='loader' style={{ display: { spinner } }}></div>}

                {err ? <p className='error'>{err} </p> : <p className='Success'>{success}</p>}

            </div>

        </div>
    )
}