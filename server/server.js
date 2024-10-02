const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const bodyparser = require("body-parser");
const port = 1200;
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const designationRoutes = require("./routes/designationRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);
app.use("/api/skills", designationRoutes);
app.use("/api/user-skills", designationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
