const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    ratingNumber: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
    },
    userId: {
        type: String,
        required: true,
    },
    doctorId: {
        type: String,
        required: true,
    }

   
   
}, { timestamps: true });

module.exports = mongoose.model("Rating", ratingSchema);
