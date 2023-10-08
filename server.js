// packages Imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";
import helmet from "helmet";
import xss from "xss-clean";
import ExpressMongoSanitize from "express-mongo-sanitize";
import SwaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";

//files import
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobsRoute.js";
//DOTENV Config
dotenv.config({});

//mongoDB connection
connectDB();

//swagger api config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "job portal application",
      description: "Node Expressjs Job Portal Application",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerDoc(options);

// rest object (it helps to perform routing/ create middleware)
const app = express();

//middlewares
app.use(helmet());
app.use(xss());
app.use(ExpressMongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);

//homeroute root
app.use("/api-doc", SwaggerUi.serve, SwaggerUi.setup(spec));

// validation middleware
app.use(errorMiddleware); // we are using this here because if we use upper then it will block other execution

//PORT
const PORT = process.env.PORT || 8000;

//Listen
app.listen(PORT, () => {
  console.log(
    `Node Server Is Running In ${process.env.DEV_MODE} on PORT ${PORT}`.bgWhite
      .blue
  );
});
