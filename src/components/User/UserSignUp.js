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

    const [err, SetError] = useState('')
    const [success, SetSuccess] = useState('')
    const [signUpBtnStatus, SetSignUpBtnStatus] = useState(false)
    const [spinner, setSpinner] = useState('none')


    async function SubmitData() {

        SetSuccess('')
        SetError('')

        let allowsignUp = true

        if (userName === '' || userAge === '' || userMobileNo === '' || userEmail === '' || userPhoto === '') {

            SetError('Fill all the fields')
        }

        else {

            SetSignUpBtnStatus(true)

            try {

                let responseData = await axiosConn.post('/api/login', {
                    email: userEmail,
                    mobileNo: userMobileNo
                })

                if ((responseData.data).length > 0) {

                    allowsignUp = false
                }


            }
            catch (err) {

                console.log(err.response.data.message.details);

                SetError(err.response.data.message.details[0].message)
            }

            if (allowsignUp) {

               
                formData.append("image", userPhoto);
                formData.append("name", userName);
                formData.append("age", userAge);
                formData.append("mobileNo", userMobileNo);
                formData.append("email", userEmail);
                formData.append("photo", userPhoto.name);
                formData.append("flag", 'false');
                formData.append("isAdmin", 'false');
                console.log('formdta', formData);

                axiosConn.post("/api/addUser", formData

            

                ).then((res) => {

                    SetSuccess('Sign up done successfully  redirecting to login page')

                    if (res) {
                        setSpinner('flex')
                        if (res) {

                            setTimeout(() => {

                                return (navigate('/userLogin'))

                            }, 1000)
                        }
                    }




                }).catch(err => {

                    if(err.response.data){
                        SetError('Only png,jpeg and jpg file allowed')
                    }

                    if (err.response.data.message.details) {
                        SetError(err.response.data.message.details[0].message)
                    }

              
                    console.log('sign up err', err.response.data.message.details)

                })

            }
            else {

                SetError("User mobile number or email already exist")

            }

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

                <label
                    className="lbl">Age </label
                >
                <input type='number' className='userip' name='age' placeholder='age' onChange={(e) => dispatch({ type: 'addAge', age: e.target.value })}></input>

                <label
                    className="lbl">Mobile No </label
                >
                <input type='number' className='userip' name='mobileNo' placeholder='mobile Number' onChange={(e) => dispatch({ type: 'addMobileNo', mobileNo: e.target.value })}></input>

                <label
                    className="lbl"> Email Id</label
                >
                <input type='text' className='userip' name='email' placeholder='email address' onChange={(e) => dispatch({ type: 'addEmail', email: e.target.value })}></input>

                <label
                    className="lbl"> photo</label
                >
                <input type='file' className='userPhoto' name='photo' onChange={(e) => dispatch({ type: 'addPhoto', photo: e.target.files[0] })}></input>



                {spinner == 'none' ? <button className='userSignUpInBtn' onClick={() => SubmitData()} disabled={signUpBtnStatus} >Sign Up</button> : <div className='loader' style={{ display: { spinner } }}></div>}

                {err ? <p className='err'>{err} </p> : <p className='note'>blankNote</p>}

                {success ? <p className='success'>{success} </p> : <p className='note'>blankNote</p>}



            </div>

        </div>

    )
}