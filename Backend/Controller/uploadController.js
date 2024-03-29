import { query } from "../configure/configure.js";

const insertFileIntoDB = async (imgUrl, vedUrl) => {
  try {
    const result = await query(
      "INSERT INTO uploaddata (imgu, vedu) VALUES (?, ?)",
      [imgUrl, vedUrl]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error inserting file into database:", error);
    throw error;
  }
};

export const createVideo = async (req, res, next) => {
  const { imgUrls, vidUrl } = req.body;

  if (!imgUrls || !vidUrl) {
    res.status(400);
    return next(new Error("imgUrls & vidUrl fields are required"));
  }

  try {
    for (const imgUrl of imgUrls) {
      await insertFileIntoDB(imgUrl, vidUrl);
    }

    res.status(201).json({
      success: true,
      msg: "Inserted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
