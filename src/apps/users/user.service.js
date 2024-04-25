const { filter } = require("lodash");
const User = require("./user.schema")


const createUserService = async (data) => {
    const user = await new User({
        ...data,
    })

    user.save();

    return user;
}

const findOneUserService = async (filter) => {
    return await User.findOne(filter)
}

const findAllUserService = async () => {
    return await User.find().sort('name')
}

module.exports = { createUserService, findOneUserService, findAllUserService };

