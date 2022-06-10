import './style.css'
import react, { useState } from 'react';
import axiosConn from '../../webApiConfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Axios = require('axios');


export default function UserSignUp() {


    const formData = new FormData();

    const dispatch = useDispatch()
    const navigate = useNavigate();


    const userName = useSelector((state) => state.addUser.name)
    const userAge = useSelector((state) => state.addUser.age)
    const userMobileNo = useSelector((state) => state.addUser.mobileNo)
    const userEmail = useSelector((state) => state.addUser.email)
    const userPhoto = useSelector((state) => state.addUser.photo)

    const [nameErr, SetNameError] = useState('')
    const [ageErr, SetAgeError] = useState('')
    const [mobileNoErr, SetMobileNoError] = useState('')
    const [emailErr, SetEmailError] = useState('')
    const [photoErr, SetPhotoError] = useState('')
    const [err, SetError] = useState('')

    const [success, SetSuccess] = useState('')
    const [signUpBtnStatus, SetSignUpBtnStatus] = useState(false)
    const [spinner, setSpinner] = useState('none')


    async function SubmitData() {

        SetSuccess('')
        SetError('')
        SetNameError('')
        SetAgeError('')
        SetMobileNoError('')
        SetEmailError('')
        SetPhotoError('')



        if (userName === '' || userAge === '' || userMobileNo === '' || userEmail === '' || userPhoto === '') {

            SetError('all the fields required')
        }

        else {

            SetSignUpBtnStatus(true)
            console.log('img obj', userPhoto);
            formData.append("image", userPhoto);
            formData.append("name", userName);
            formData.append("age", userAge);
            formData.append("mobileNo", userMobileNo);
            formData.append("email", userEmail);
            formData.append("photo", userPhoto.name);
            formData.append("flag", 'false');
            formData.append("isAdmin", 'false');
            console.log('formdata', formData);

            axiosConn.post("/api/addUser", formData)
                .then((res) => {



                    console.log('mysignupres', res);

                    if (res.data.length > 0) {

                        SetError('Sorry email or mobile no. already exist')


                    }

                    else {

                        SetSuccess('Sign up done successfully  redirecting to login page')

                        if (res) {
                            setSpinner('flex')

                            if (res) {

                                setTimeout(() => {

                                    return (navigate('/userLogin'))

                                }, 2000)
                            }
                        }



                    }

                })
                .catch((err) => {

                    if (err.response.data.Message) {
                        
                        SetPhotoError(err.response.data.Message)
                    }


                    let errors = err.response.data.message.details
                    errors.map((errMsg) => {

                        console.log('errmsg', errMsg);


                        if ((errMsg.message).includes('name')) {
                            SetNameError(errMsg.message)
                        }
                        if ((errMsg.message).includes('age')) {
                            SetAgeError(errMsg.message)
                        }
                        if ((errMsg.message).includes('mobileNo')) {
                            SetMobileNoError(errMsg.message)
                        }
                        if ((errMsg.message).includes('email')) {
                            SetEmailError('email id must be valid email')
                        }

                    })


                    console.log('sign up err', err.response.data.message.details)

                })




        }

        SetSignUpBtnStatus(false)
    }



    return (

        <div className="userLoginContainer">

            <div className="userLoginWrapper">
                <h2>Sign Up</h2>

                <label
                    className="lbl"> Name </label
                >
                <input type='text' className='userip' name='name' placeholder='name' onChange={(e) => dispatch({ type: 'addName', name: e.target.value })}></input>
                {nameErr ? <p className='err'>{nameErr} </p> : <p className='note'>blankNote</p>}

                <label
                    className="lbl">Age </label
                >
                <input type='number' className='userip' name='age' placeholder='age' onChange={(e) => dispatch({ type: 'addAge', age: e.target.value })}></input>
                {ageErr ? <p className='err'>{ageErr} </p> : <p className='note'>blankNote</p>}
                <label
                    className="lbl">Mobile No </label
                >
                <input type='number' className='userip' name='mobileNo' placeholder='mobile Number' onChange={(e) => dispatch({ type: 'addMobileNo', mobileNo: e.target.value })}></input>
                {mobileNoErr ? <p className='err'>{mobileNoErr} </p> : <p className='note'>blankNote</p>}

                <label
                    className="lbl"> Email Id</label
                >
                <input type='text' className='userip' name='email' placeholder='email address' onChange={(e) => dispatch({ type: 'addEmail', email: e.target.value })}></input>
                {emailErr ? <p className='err'>{emailErr} </p> : <p className='note'>blankNote</p>}
                <label
                    className="lbl"> Photo</label
                >
                <input type='file' className='userPhoto' name='photo' onChange={(e) => dispatch({ type: 'addPhoto', photo: e.target.files[0] })}></input>
                {photoErr ? <p className='err'>{photoErr} </p> : <p className='note'>blankNote</p>}


                {spinner == 'none' ? <button className='userSignUpInBtn' onClick={() => SubmitData()} disabled={signUpBtnStatus} >Sign Up</button> : <div className='loader' style={{ display: { spinner } }}></div>}


                {err ? <p className='Error'>{err} </p> : <p className='note'>blankNote</p>}
                {success ? <p className='success'>{success} </p> : <p className='note'>blankNote</p>}



            </div>

        </div>

    )
}