const Joi = require("joi");

const registerValidation = (data) => {
    const schema = Joi.object({

        name: Joi.string().min(1).max(30).required(),
        age: Joi.number().min(1).max(150).required(),
        mobileNo: Joi.string().min(10).max(10).required(),
        email: Joi.string().min(11).max(25).pattern(new RegExp('@gmail.com$')).required(),
        photo: Joi.string().required(),
        flag: Joi.string().required(),
        isAdmin: Joi.string().required()
    }).unknown();

    return schema.validate(data);


}


const flagValidation = (data) => {
    const schema = Joi.object({

        flag: Joi.string().required(),

    }).unknown();

    return schema.validate(data);


}


const editValidation = (data) => {
    const schema = Joi.object({

        name: Joi.string().min(1).max(30).required(),
        age: Joi.number().min(1).max(150).required(),
        mobileNo: Joi.string().min(10).max(10).required(),
        email: Joi.string().min(11).max(25).pattern(new RegExp('@gmail.com$')).required(),
        photo: Joi.string().required(),

    }).unknown();

    return schema.validate(data);


}


const deleteValidation = (data) => {
    const schema = Joi.object({


        mobileNo: Joi.string().min(10).max(10).required(),


    }).unknown();

    return schema.validate(data);


}


module.exports.Validation = { registerValidation, flagValidation, editValidation, deleteValidation }