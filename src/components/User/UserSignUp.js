import './style.css'
import react, { useState } from 'react';
import axiosConn from '../../webApiConfig';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
const Axios = require('axios');


export default function UserSignUp() {

    const dispatch = useDispatch()
    const navigate = useNavigate();


    const userName = useSelector((state) => state.addUser.name)
    const userAge = useSelector((state) => state.addUser.age)
    const userMobileNo = useSelector((state) => state.addUser.mobileNo)
    const userEmail = useSelector((state) => state.addUser.email)
    const userPhoto = useSelector((state) => state.addUser.photo)
    
    const [err, SetError] = useState('')
    const [success, SetSuccess] = useState('')




    async function SubmitData() {

        SetSuccess('')

        if (userName === '' || userAge === '' || userMobileNo === '' || userEmail === '' || userPhoto === '') {

            SetError('Fill all the fields')
        }

        else {
  
            let responseData = await axiosConn.get("/api/showdb")
            let newData = responseData.data
            let Allow = true
            newData.forEach((currUser, indx) => {

                if (currUser.mobileNo === userMobileNo || currUser.email === userEmail) {

                    Allow = false
                   
                }
            })

            if (Allow) {
                axiosConn.post("/api/addUser", {

                    name: userName,
                    age: userAge,
                    mobileNo: userMobileNo,
                    email: userEmail,
                    photo: userPhoto,
                    flag: "false",
                    isAdmin:"false"

                }).then((res) => {
                    SetSuccess('data saved successfully')
                    SetError('')
                    navigate('/userLogin')
                }).catch(e => SetError(e.message))


            }
            else {

                SetError("User Mobile No Or Email Already Exist In Database")

            }

        }
    }



    return (

      
        <div className="userLoginContainer">

            <div className="userLoginWrapper">
                <h2>Sign Up</h2>


                <lable className="lbl"> Name </lable>
                <input type='text' className='userip' name='name' placeholder='name' onChange={(e) => dispatch({ type: 'addName', name: e.target.value })}></input>

                <lable className="lbl">Age </lable>
                <input type='text' className='userip' name='age' placeholder='age' onChange={(e) => dispatch({ type: 'addAge', age: e.target.value })}></input>

                <lable className="lbl">Mobile No </lable>
                <input type='text' className='userip' name='mobileNo' placeholder='mobile Number' onChange={(e) => dispatch({ type: 'addMobileNo', mobileNo: e.target.value })}></input>

                <lable className="lbl"> Email Id</lable>
                <input type='text' className='userip' name='email' placeholder='email address' onChange={(e) => dispatch({ type: 'addEmail', email: e.target.value })}></input>

                <lable className="lbl"> photo</lable>
                <input type='text' className='userip' name='photo' placeholder='photo url' onChange={(e) => dispatch({ type: 'addPhoto', photo: e.target.value })}></input>



                <button className='userLogInBtn' onClick={() => SubmitData()} >Sign Up</button>

                {err ? <p className='err'>{err} </p> : <p className='note'>Hit login</p>}
                {success ? <p className='success'>{success} </p> : <p className='note'>Hit login</p>}



            </div>

        </div>
        
    )
}