import { v2 } from "cloudinary";
import "dotenv/config";
import fs from "fs";

v2.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

export const uploadImage = async (path: string): Promise<string> => {
  const result = await v2.uploader.upload(path, {
    folder: "mern-crwn",
    resource_type: "auto",
  });
  fs.unlinkSync(path);
  return result.secure_url;
};
