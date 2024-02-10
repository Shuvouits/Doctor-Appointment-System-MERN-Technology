const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    fullName : {
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
        required: true,
    
    },
    userType: {
        type: String,
        enum: ['Patient', 'Doctor'],
        required: true,
        
    },

    avatar: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconarchive.com%2Fshow%2Fpapirus-status-icons-by-papirus-team%2Favatar-default-icon.html&psig=AOvVaw2gXLCs-AGz2pGOfKCABch-&ust=1707659322101000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJC9uev0oIQDFQAAAAAdAAAAABAG"
    }

}, {timestamps : true}); 

module.exports = mongoose.model("User", userSchema);