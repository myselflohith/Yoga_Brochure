const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

//for inserting data into database
const insertRoutes = require("./Routes/insertRoute");
app.use("/api/v1/insert", insertRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
