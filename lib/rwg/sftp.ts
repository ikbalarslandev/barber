import SftpClient from "ssh2-sftp-client";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const sftp = new SftpClient();

export const uploadFeeds = async (localDir: string, remoteDir: string) => {
  const config = {
    host: "partnerupload.google.com",
    port: 19321,
    username: process.env.SFTP_USER,
    passphrase: process.env.SFTP_PASSWORD,
    privateKey: fs.readFileSync("/Users/ikbal/Desktop/id_rsa", "utf8"),
  };

  try {
    await sftp.connect(config);

    const files = fs.readdirSync(localDir);
    for (const file of files) {
      const localPath = path.join(localDir, file);
      const remotePath = path.join(remoteDir, file);
      console.log(`📤 Uploading ${file}...`);
      await sftp.put(localPath, remotePath);
    }

    console.log("✅ All files uploaded successfully.");
  } catch (err) {
    console.error("❌ Upload failed:", err);
  } finally {
    sftp.end();
  }
};
