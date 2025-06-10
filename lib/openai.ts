import OpenAI from "openai";
import { downloadFile } from "./file-downloader";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const TEXT_MODEL = "gpt-4o-mini";
const IMG_MODEL = "dall-e-2";
const IMG_SIZE = "512x512";
const IMG_PATH = "/images/image.png";
const STARTING_PROMPT =
  "Generate a random image prompt for Dall-E. The prompt should be a short sentence describing an image. For example, 'a painting of a cat sitting on a chair' or 'a photo of a baby panda'. The prompt should be no longer than 10 words.";

export async function generatePromptAndImage(): Promise<_OpenAIResponse> {
  const res = await generateImagePrompt();

  if (!res.success)
    return { success: false, msg: "Error generating image: no valid prompt" };

  const prompt = res.body.prompt;

  const response = await client.images.generate({
    model: IMG_MODEL,
    prompt: prompt,
    n: 1,
    size: IMG_SIZE,
  });

  if (!response.data)
    return { success: false, msg: "Error generating image: no response data" };

  const imgUrl = response.data[0].url;

  if (!imgUrl)
    return { success: false, msg: "Error generating image: no valid img url" };

  await downloadFile(imgUrl);

  return { success: true, body: { prompt, imgPath: IMG_PATH } };
}

async function generateImagePrompt(): Promise<_OpenAIResponse> {
  const response = await client.responses.create({
    model: TEXT_MODEL,
    input: STARTING_PROMPT,
  });

  if (!response)
    return {
      success: false,
      msg: "Error generating prompt: no response from openAI",
    };

  const prompt = response.output_text;

  return { success: true, body: { prompt } };
}
