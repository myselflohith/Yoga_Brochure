import cloudinary from "cloudinary";

import { query } from "../configure/configure.js";

cloudinary.v2.config({
  cloud_name: "dfdgmkmhr",
  api_key: "184252367175162",
  api_secret: "WBablfBZB9cqGD6m6wutxgdGgl8",
});

// const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dfdgmkmhr/upload";
// const cloudinaryApiKey = "184252367175162";
// const cloudinaryApiSecret = "WBablfBZB9cqGD6m6wutxgdGgl8";

const insertFileIntoDB = async (fileType, fileUrl) => {
  try {
    const [rows] =await query("INSERT INTO files (type, url) VALUES (?, ?)", [
      fileType,
      fileUrl,
    ]);
    return rows.insertId;
  } catch (error) {
    console.error("Error inserting file into database:", error);
    throw error;
  }
};

const uploadFile = async (req, res) => {
  console.log(req.body);
  const { file, fileType } = req.body;

  if (!file || !fileType) {
    return res
      .status(400)
      .json({ message: "Please provide a file and file type" });
  }

  try {
    const uploadedFile = await cloudinary.v2.uploader.upload(file, {
      resource_type: fileType,
    });
    console.log(uploadedFile);

    // Insert file details into MySQL database
    await insertFileIntoDB(fileType, uploadedFile.secure_url);

    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Error uploading file" });
  }
};

// const uploadAudioFile = async (file) => {
//   try {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "ml_default");
//     const response = await axios.post(cloudinaryUrl, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//       auth: {
//         username: cloudinaryApiKey,
//         password: cloudinaryApiSecret,
//       },
//     });

//     return response.data.secure_url;
//   } catch (error) {
//     console.error("Error uploading audio file to Cloudinary:", error);
//     throw error;
//   }
// };

// const uploadVideoFile = async (file) => {
//   try {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "ml_default");

//     const response = await axios.post(cloudinaryUrl, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//       auth: {
//         username: cloudinaryApiKey,
//         password: cloudinaryApiSecret,
//       },
//     });

//     return response.data.secure_url;
//   } catch (error) {
//     console.error("Error uploading video file to Cloudinary:", error);
//     throw error;
//   }
// };

// const uploadImageFile = async (file) => {
//   try {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "ml_default");

//     const response = await axios.post(cloudinaryUrl, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//       auth: {
//         username: cloudinaryApiKey,
//         password: cloudinaryApiSecret,
//       },
//     });

//     return response.data.secure_url;
//   } catch (error) {
//     console.error("Error uploading image file to Cloudinary:", error);
//     throw error;
//   }
// };

export { uploadFile };
