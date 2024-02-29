const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    doctor: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    ticketPrice: {
        type: String,
        required: true,
    },
    session: {
        type: String,
        required: true,
    },
   
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
