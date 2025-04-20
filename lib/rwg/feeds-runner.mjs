import { exec } from "child_process";

const runFeeds = () => {
  console.log(`[${new Date().toISOString()}] Running feeds...`);
  exec("pnpm run feeds", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running feeds: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
  });
};

runFeeds();
setInterval(runFeeds, 30 * 1000);
