const app = require("./app");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
dotenv.config();

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
      );
    });
  } catch (err) {
    console.error("database connection failed", err.message);
  }
};

start();
