const express = require("express");
const dotenv = require("dotenv");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongosanitize = require("express-mongo-sanitize");
const { apiResponse } = require("./utils/apiResponse");
const { asyncHandler } = require("./utils/asyncHandler");
const authRouter = require("./modules/auth/auth.route");

app.use(mongosanitize());
dotenv.config(); 
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(express.json());

const userRouter = require('./modules/user/user.route');
const categoryRouter = require('./modules/category/categoery.route');
const productRouter = require("./modules/product/product.route");


app.get("/api/v1/health", (_req, res) =>
  res.status(200).json(
    apiResponse(
      200,
      {
        service: "ecom-backend",
        env: process.env.NODE_ENV,
        uptimeSeconds: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
      },
      "API is running",
    ),
  ),
);

app.get(
  "/api/v1/boom",
  asyncHandler(async () => {
    throw apiError(
      418,
      "This error was thrown on purpose to test errorHandler",
    );
  }),
);


app.use(" api/v1/auth",authRouter);
app.use("api/v1/user",userRouter);

app.use(" api/v1/brand",brandRouter);
app.use("api/v1/category",categoryRouter);

app.use("/api/v1/product",productRouter)
