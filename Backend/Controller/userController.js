import { query } from "../configure/configure.js";
import { hash, compare } from "bcrypt";

const insertUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const hashedPassword = await hash(password, 10);

    const sql = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";

    const result = await query(sql, [name, email, hashedPassword]);

    if (result && result.affectedRows === 1) {
      return res
        .status(200)
        .json({ success: true, message: "User registered successfully" });
    } else {
      throw new Error("Failed to insert user into the database");
    }
  } catch (error) {
    console.error("Error inserting user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    const user = await query("SELECT * FROM user WHERE email = ?", [email]);
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
