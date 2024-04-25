const { filter } = require("lodash");
const User = require("../users/user.schema");

const createNewUserService = async (data) => {
  const user = await new User({
    ...data,
  });

  user.save();

  return user;
};

const findOneUserService = async (filter) => {
  return await User.findOne(filter);
};

const findByIdAndUpdateService = async (filter) => {
  return await User.findById(filter);
};


module.exports = {
  createNewUserService,
  findOneUserService,
  findByIdAndUpdateService,
};
