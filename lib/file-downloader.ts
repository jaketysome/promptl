import fs from "node:fs";

export async function downloadFile(url: string) {
  const response = await fetch(url);
  if (!response.arrayBuffer)
    return { success: false, msg: "Error fetching image data!" };

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  fs.writeFile("./public/images/image.png", buffer, (err) => {
    if (err) {
      console.error("Error saving image: ", err);
    } else {
      console.log("File written successfully!");
    }
  });
}
