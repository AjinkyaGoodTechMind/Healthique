const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var logger = require("morgan");
var path = require("path");
const cron = require("node-cron");
const { subscriptionCheck } = require("./middlewares/subscriptionCheck");

cors = require("cors");
const corsOptions = {
  origin: true,
  credentials: true,
};
app.options("*", cors(corsOptions));

// Static Middleware
const public = path.resolve(__dirname, "public");
app.use(express.static(public));

// View Engine Setup
app.set("views", path.join(__dirname, "views"));

// view engine setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

cron.schedule("0 0 * * *", subscriptionCheck);

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config/config.env" });
}

const sessionRoutes = require("./routes/sessionRoutes");
const jobPostsRoutes = require("./routes/jobPostsRoutes");
const bidsRoutes = require("./routes/bidsRoutes");
const adminRoutes = require("./routes/adminRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const customerRoutes = require("./routes/customerRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const plansRoutes = require("./routes/plansRoues");

app.use("/api/session", sessionRoutes);
app.use("/api/jobPosts", jobPostsRoutes);
app.use("/api/bids", bidsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/plans", plansRoutes);

app.use("/public", express.static(path.join(__dirname, "public")));

//Routes Section End--------------------------

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

module.exports = app;
