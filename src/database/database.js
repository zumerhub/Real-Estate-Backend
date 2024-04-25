const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL)
.then(() => console.log('mongoose connected!!!'))
.catch(() => console.log('error not connected!!!'));

module.exports = mongoose;