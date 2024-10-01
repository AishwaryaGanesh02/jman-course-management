const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const port = 1200;
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
const designationRoutes = require('./routes/designationRoutes');

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);
app.use('/api/designations', designationRoutes);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
