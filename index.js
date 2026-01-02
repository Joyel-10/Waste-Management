

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// require("./connection1");

// // ROUTES
// const routes = require("./router");
// const dashboardRoutes = require("./Routes/dashboardRoutes");
// const pickupRoutes = require("./Routes/pickupRoutes");
// const paymentRoutes = require("./Routes/paymentRoutes");
// const complaintRoutes = require("./Routes/complaintRoutes");
// const profileRoutes = require("./Routes/profileRoutes");
// const adminRoutes = require("./Routes/Admin/adminRoutes");

// const app = express();

// // MIDDLEWARES
// app.use(cors());
// app.use(express.json());

// // ROUTES
// app.use(routes);
// app.use("/api/user", dashboardRoutes);
// app.use("/api/pickup", pickupRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/complaints", complaintRoutes);
// app.use("/api/profile", profileRoutes);
// app.use("/api/admin", adminRoutes);

// // STATIC FILES
// app.use("/uploads", express.static("uploads"));

// // PORT
// const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => {
//   console.log(` Server running at http://localhost:${PORT}`);
// });


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./connection1");

// ROUTES
const routes = require("./router");
const dashboardRoutes = require("./Routes/dashboardRoutes");
const pickupRoutes = require("./Routes/pickupRoutes");
const paymentRoutes = require("./Routes/paymentRoutes");
const complaintRoutes = require("./Routes/complaintRoutes");
const profileRoutes = require("./Routes/profileRoutes");
const adminRoutes = require("./Routes/Admin/adminRoutes");

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ROUTES
app.use(routes);
app.use("/api/user", dashboardRoutes);
app.use("/api/pickup", pickupRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);

// STATIC FILES
// app.use("/uploads", express.static("uploads"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));



// PORT
const PORT = process.env.PORT || 4000;

//  CONNECT DB FIRST, THEN START SERVER
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
});
