const db = require("../Configure/configure");

const insertUser = (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    const sql = `insert into register(name,email,password) values(?,?,?)`;
    db.query(sql, [name, email, password], (err, result) => {
      if (err) {
        res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      } else {
        res.status(201).json({ success: true, msg: "inserted successfully" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { insertUser };
