import SftpClient from "ssh2-sftp-client";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const sftp = new SftpClient();

export const uploadFeeds = async (localDir: string) => {
  const config = {
    host: "partnerupload.google.com",
    port: 19321,
    username: process.env.SFTP_USER,
    passphrase: process.env.SFTP_PASSWORD,
    privateKey: process.env.SSH_PRIVATE_KEY,
  };

  try {
    await sftp.connect(config);

    const files = fs.readdirSync(localDir);
    for (const file of files) {
      const localPath = path.join(localDir, file);
      const remotePath = path.join("/", file);
      console.log(`📤 Uploading ${file}...`);
      await sftp.put(localPath, remotePath);
    }
    // delete feeds folder after upload
    fs.rmSync(localDir, { recursive: true, force: true });

    console.log("✅ All files uploaded successfully.");
  } catch (err) {
    console.error("❌ Upload failed:", err);
  } finally {
    sftp.end();
  }
};
