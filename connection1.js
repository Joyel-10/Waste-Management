// import mongoose

const mongoose = require("mongoose")

const connectionString = process.env.DATABASE  // accessing the environment variable

// connection

mongoose.connect(connectionString).then(() => {  // connect method returems a promise
    console.log(`MongoDB Connected Successfully`); 

}).catch((err) => {
    console.log(`MongoDB Connection Failed Due to : ${err}`);

})