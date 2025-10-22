import { readdir } from "fs/promises";

async function listFiles(directory) {
  try {
    const files = await readdir(directory, { withFileTypes: true });
    console.log("Files in directory:", files);
  } catch (error) {
    console.error("Error reading directory:", error);
  }
}

await listFiles("./src");
