import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_cloud_name,
  api_key: process.env.CLOUDINARY_api_key,
  api_secret: process.env.CLOUDINARY_api_secret,
});

const uploadOnCloudinary = async (localfilePath) => {
  try {
    if (!localfilePath) return console.log("localfilePath does not exist");

    const response = await cloudinary.uploader.upload(localfilePath, {
      resource_type: "auto",
    });
    console.log("File Upload Successfully", response.url);

    return response;
  } catch (error) {
    fs.unlinkSync(localfilePath);
    //yeh file k path ko del kr dy ga or sync ka mtlb hai yeh kam hona he chahiyay
    return null;
  }
};


export {uploadOnCloudinary}