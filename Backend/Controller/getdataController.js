import { query } from "../configure/configure.js";
export const getData = async (req, res) => {
  try {
    const sql = `select * from cloud`;
    query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json({ success: "false", msg: "something went wrong" });
      }
      res.status(200).json({ success: "true", data: result });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "false", msg: "Internal server error" });
  }
};
