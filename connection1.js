// // import mongoose

// const mongoose = require("mongoose")

// const connectionString = process.env.DATABASE  // accessing the environment variable

// // connection

// mongoose.connect(connectionString).then(() => {  // connect method returems a promise
//     console.log(`MongoDB Connected Successfully`); 

// }).catch((err) => {
//     console.log(`MongoDB Connection Failed Due to : ${err}`);

// })


// import mongoose
const mongoose = require("mongoose");

const connectionString = process.env.DATABASE; // accessing the environment variable

// connection function that returns a promise
const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 75000, // 75 seconds
    });
    console.log(` MongoDB Connected Successfully`);
  } catch (err) {
    console.error(` MongoDB Connection Failed Due to: ${err.message}`);
    throw err;
  }
};

// Handle connection events
mongoose.connection.on("disconnected", () => {
  console.log(" MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error(" MongoDB error:", err);
});

module.exports = connectDB;