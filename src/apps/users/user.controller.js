
const Joi = require("joi");
const { createUserService, findAllUserService } = require("./user.service");
const {createUserValidation} = require("./user.validation");




const testUser = (req, res, next) => {
    // retun your response
    return res.json('Api up and running');
}
const getAllUsers = async (req, res) => {
const users = await findAllUserService()
return res.json(users);
}

const createUser = async (req, res) => {
try{
    const { error } = createUserValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // check if user already exists
    const existUser = await findOneEsateService({ email: req.body.email });

    if (existUser) {
        return res.status(400).send('Estate already exists');
    }
    // create the user
    const user = await new createUserService(req.body);

    res.status(201).json({ message: 'User added successfully', data: user });
} catch (error) {
    console.error('Error adding newUser:', error);
    res.status(500).json({ error: 'Internal server error' });
}

};


module.exports = { createUser, testUser, getAllUsers };