const express = require("express");
const app = express();
const sequelize = require("sequelize");
require("dotenv").config();
const cors = require("cors");

//* Importing the routers
const userRouter = require("./routers/userRouter");
const guestRouter = require("./routers/guestRoutes");

//* Importing the routers for Authentication
const userAuthRouter = require("./routers/auth/userAuthRoutes");
const guestAuthRouter = require("./routers/auth/guestAuthRoutes");
const thesisRouter = require("./routers/thesisRoutes");

//* Variables
const PORT = process.env.PORT || 5000;

//* Database
const db = require("./models");

//* Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

//* Routers
app.use("/api/users", userRouter);
app.use("/api/guests", guestRouter);
app.use("/api/thesis", thesisRouter);

//* Routers for AUTHENTICATION
app.use("/api/auth/user", userAuthRouter);
app.use("/api/auth/guest", guestAuthRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
