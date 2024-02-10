const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {readdirSync} = require('fs');
const dotenv = require('dotenv')
dotenv.config();

mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log('Connected to MongoDB')
}).catch((err)=>{
    console.log(err)
})

const app = express();
app.use(express.json());
app.use(cors())

// Import routes dynamically using the import syntax
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r))); 

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}..`)
})