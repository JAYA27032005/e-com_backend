const dns = require("dns");
dns.setServers(["8.8.8.8","8.8.4.4"]);
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB =async () => {
const connection = await mongoose.connect(process.env.Mongo_URI);
  
  console.log(`MongoDB connected: ${connection.connection.host}`);
};

dotenv.config();
module.exports = connectDB;