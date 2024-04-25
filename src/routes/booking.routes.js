const express = require('express');

const router = express.Router();
const bookingController = require('../apps/booking/bookin.controllers.js');


router.get('/booking', bookingController.getEstates);

router.post('/booking', bookingController.createBooking);

module.exports = router;