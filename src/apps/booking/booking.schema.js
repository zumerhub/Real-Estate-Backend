const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  estate: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Estate',
      required: true
    }
  ],

  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  timestamp: {
    type: Date,
    default: Date.now // Set default value to the current timestamp when a document is created
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
