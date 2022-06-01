const express = require('express')

const router = express.Router();
const { registerValidation } = require('../validation')

const db = require('../models');

router.get('/all', (req, res) => {

    db.userData.findAll().then((userdata) => {
        return res.send(userdata)
    })
})

router.post('/new', async (req, res) => {

    const { error } = registerValidation({

        name: req.body.name,
        age: req.body.age,
        mobileNo: req.body.mobileNo,
        email: req.body.email,
        photo: req.body.photo,
        flag: 'false'
    })

    if (error) {

        return res.send(error.details[0].message)
    }

    else {


        db.userData.create({
            name: req.body.name,
            age: req.body.age,
            mobileNo: req.body.mobileNo,
            email: req.body.email,
            photo: req.body.photo,
            flag: 'false'

        }).then((submitData) => {
            console.log('data', submitData);
            return res.send(submitData);
        }).catch(e => res.send(e.errors))


    }

});


router.put('/accept', (req, res) => {

    db.userData.update({
        flag: 'true'
    },
        {
            where: {

                mobileNo: req.body.mobileNo
            }
        }).then((data) => res.send(data)).catch((e) => alert('err', e))
})

router.put('/reject', (req, res) => {

    db.userData.update({
        flag: 'false'
    },
        {
            where: {

                mobileNo: req.body.mobileNo
            }
        }).then((data) => res.send("success")).catch((e) => alert('err', e))
})

module.exports = router