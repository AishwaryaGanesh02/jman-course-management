const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const port = 1200;

const authRoutes = require("./routes/authRoutes");
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
