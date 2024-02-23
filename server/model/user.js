const mongoose = require('mongoose');

const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
};

const generateRandomId = () => {
    // Implement your logic to generate a random ID (e.g., using a library)
    // For demonstration purposes, using a simple random number here
    return Math.floor(Math.random() * 1000000).toString();
};

const qualificationSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        get: (value) => (value ? formatDate(value) : null),
    },
    endDate: {
        type: Date,
        get: (value) => (value ? formatDate(value) : null),
    },
    id: {
        type: String,
        default: generateRandomId,
    },
    qdegree: String,
    quniversity: String,
});

const experienceSchema = new mongoose.Schema({
    estartDate: {
        type: Date,
        get: (value) => (value ? formatDate(value) : null),
    },
    eendDate: {
        type: Date,
        get: (value) => (value ? formatDate(value) : null),
    },
    id: {
      type: String,
      default: generateRandomId,
  },
    edegree: String,
    euniversity: String,
});

const timeSchema = new mongoose.Schema({
    startTime: String,
    endTime: String,
    day: String,
    id: {
      type: String,
      default: generateRandomId,
  },
});

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        default: 'Male',
    },
    blood: {
        type: String,
    },
    userType: {
        type: String,
        enum: ['Patient', 'Doctor'],
        default: 'Patient',
    },
    avatar: {
        type: String,
    },
    phone: {
        type: String,
    },
    speciality: {
        type: String,
    },
    ticket: {
        type: Number,
    },
    bio: {
        type: String,
    },
    about: {
        type: String,
    },
    qualifications: [qualificationSchema],
    experience: [experienceSchema],
    time: [timeSchema],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
