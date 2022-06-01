
const express = require('express')
const app = express()
const db = require('../models');
const { Validation } = require('../validation')




app.get('/showdb', (req, res) => {

    db.userData.findAll().then((userdata) => {
        return res.status(200).send(userdata)
    }).catch((err) => res.status(400).send("error occured"))
})

app.post('/addUser', async (req, res) => {


    const { error } = Validation.registerValidation({

        name: req.body.name,
        age: req.body.age,
        mobileNo: req.body.mobileNo,
        email: req.body.email,
        photo: req.body.photo,
        flag: 'false',
        isAdmin: 'false'
    })

    if (error) {


        console.log('error', error.details[0].message);
        return res.send(error.details[0].message)
    }

    else {


        db.userData.create({
            name: req.body.name,
            age: req.body.age,
            mobileNo: req.body.mobileNo,
            email: req.body.email,
            photo: req.body.photo,
            flag: 'false',
            isAdmin: 'false'

        }).then((submitData) => {
            console.log('data', submitData);
            return res.send(submitData);
        }).catch(e => res.send(e.errors))


    }

})



app.put('/allow', (req, res) => {

    const { error } = Validation.flagValidation({

        flag: 'true',

    })

    if (error) {


        console.log('error', error.details[0].message);
        return res.send(error.details[0].message)
    }

    else {

        db.userData.update({

            flag: 'true'
        },
            {
                where: {

                    mobileNo: req.body.mobileNo
                }

            }).then((data) => res.status(200).send("success")).catch((e) => alert('err', e))
    }
})

app.put('/disAllow', (req, res) => {

    const { error } = Validation.flagValidation({

        flag: 'true',

    })

    if (error) {


        console.log('error', error.details[0].message);
        return res.send(error.details[0].message)
    }

    else {

        db.userData.update({

            flag: 'false'
        },
            {
                where: {

                    mobileNo: req.body.mobileNo
                }

            }).then((data) => res.status(200).send("success")).catch((e) => alert('err', e))
    }
})

app.put('/edit', (req, res) => {

    const { error } = Validation.editValidation({

        name: req.body.name,
        age: req.body.age,
        mobileNo: req.body.mobileNo,
        email: req.body.email,
        photo: req.body.photo,

    })

    if (error) {


        console.log('error', error.details[0].message);
        return res.send(error.details[0].message)
    }

    else {

        db.userData.update({

            name: req.body.name,
            age: req.body.age,
            mobileNo: req.body.mobileNo,
            email: req.body.email,
            photo: req.body.photo,

        },
            {
                where: {

                    mobileNo: req.body.mobileNum
                }
            }).then((data) => res.status(200).send("success")).catch((e) => alert('err', e))

    }
})



app.post("/delete", (req, res) => {


    const { error } = Validation.deleteValidation({

        mobileNo: req.body.mobileNo,

    })

    if (error) {


        console.log('error', error.details[0].message);
        return res.send(error.details[0].message)
    }

    else {

        db.userData.destroy({

            where: {

                mobileNo: req.body.mobileNo
            }

        }).then(() => res.status(200).send("success")).catch(e => console.log('delete error', e));


    }
});


module.exports = app