const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/config");
const errorHandler = require("./middlewares/errorHandler");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const driverRoutes = require("./routes/driverRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const driverVehicleRoutes = require("./routes/driverVehicleRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");

console.log("PROJECT IS RUNNING");

dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/driver-vehicle", driverVehicleRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/availability", availabilityRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
