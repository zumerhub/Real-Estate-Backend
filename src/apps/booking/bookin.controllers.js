
const Booking = require('../booking/booking.schema');
const Estate = require('../estate/estate.schema');
const User = require('../users/user.schema');
const createBookingValidation = require('../booking/booking.validation');

exports.getEstates = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate({ path: 'user', select: 'name email phone number' })
            .populate({ path: 'estate', select: 'title description address price' })
            .sort('name');

        res.send(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).send('Internal server error');
    }
}


exports.createBooking = async (req, res) => {
    const { error } = createBookingValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { userId, estateId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found', status: 404 });
        }

        const estate = await Estate.findById(estateId);
        if (!estate) {
            return res.status(404).send({ message: 'Estate not found', status: 404 });
        }


        // Create a new instance of Booking
        const booking = new Booking({
            user: userId,
            estate: estateId
        });

        // Save the new booking instance
        await booking.save();

        // Update user to associate the new booking
        // user.bookings.push(booking._id); // Assuming user.bookings is an array of Booking references
        await user.save();

        res.send({ message: 'Booking created successfully', booking: booking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).send('Internal server error');
    }
}

