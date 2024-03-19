const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 5000;

//for inserting data into database
const insertRoutes = require("./Routes/insertRoute");
app.use("/api/v1/insert", insertRoutes);

//for login data
const loginData = require("./Routes/insertRoute");
app.use("/api/v1/get", loginData);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
