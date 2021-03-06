const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoClient = require("mongodb");
const MongoStore = require("connect-mongo");
const path = require("path");
const isAuth = require("./middleware/authMiddleware").isAuth;

const routes = require("./routes/api/index");
const cookieParser = require("cookie-parser");
const { socketConfig } = require("./config/socket.config");

require("dotenv").config();
const PORT = process.env.PORT || 3003;

/**
 * Creating the express application.
 */
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
socketConfig(io);
app.use("/uploads", express.static("upload"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Session set up
 */

// stores user session information in our MongoDB.
const sessionStore = MongoStore.create({
  mongooseConnection: mongoose.connection,
  collectionName: "sessions",
  mongoUrl: process.env.MONGODB_URI,
});

app.use(
  session({
    secret: process.env.SECRET_STRING,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // cookie expires in one day.
    },
  })
);

//  mongoose.set('useFindAndModify', false);

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/mintbean-project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB OPEN");
  })
  .catch((err) =>
    console.log(`Could not Connected to db ${process.env.DB_CONNECTION} `, err)
  );

/**
 *
 * <----  MIDDLEWARE --->
 *
 */
app.use(
  cors({
    origin: "http://localhost:3000", // ASSUMING FOR DEV we're running front end locally.
    credentials: true,
  })
);

/**
 * Passport Setup
 */

// pulls in our passport configuration so it's known to the whole application.

require("./middleware/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  next();
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(express.static(path.join(__dirname, "../client/build")));
/**
 * Mounting the Routes
 */

// app.use('/api', routes, isAuth);
app.use("/api", routes);
//react app routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
/**
 * Server start up
 */

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
