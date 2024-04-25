const { min } = require('lodash');
const mongoose = require('mongoose');

const estateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true,
        min: 0
      },
      description: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      imageUrl: {
        type: String,
        
      }
});

const Estate = mongoose.model('Estate', estateSchema);

module.exports = Estate;