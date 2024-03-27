import { query } from "../configure/configure.js";
import { hash, compare } from "bcrypt";

const insertUser = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const hashedPassword = await hash(password, 10);

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "Database error" });
      }
      res
        .status(200)
        .send({ success: true, message: "User registered successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    const user = await query("SELECT * FROM users WHERE email = ?", [email]);
    if (user.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    const match = await compare(password, user[0].password);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export { insertUser, getUser };
