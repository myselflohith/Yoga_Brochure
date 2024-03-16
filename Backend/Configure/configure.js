const msql = require("mysql2");

const connection = msql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "yoga_brochure",
});

connection.connect((err) => {
  if (err) {
    console.log("something went wrong");
  } else {
    console.log("connected successfully!");
  }
});
