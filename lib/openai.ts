import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const TEXT_MODEL = "gpt-4o-mini";
const IMG_MODEL = "dall-e-2";
const IMG_SIZE = "512x512";
const STARTING_PROMPT = "Generate a random image prompt for Dall-E. The prompt should be a short sentence describing an image. For example, 'a painting of a cat sitting on a chair' or 'a photo of a baby panda'. The prompt should be no longer than 10 words."

export async function generatePromptAndImage(): Promise<OpenAIResponse<{ body: ResponseBody }>> {
  const prompt = await generateImagePrompt();

  const response = await client.images.generate({
    model: IMG_MODEL,
    prompt: prompt,
    n: 1,
    size: IMG_SIZE,
  });

  const imgUrl = response.data[0].url;

  if (!imgUrl) return { success: false };

  return {success: true, body: {prompt, imgUrl}};
}

async function generateImagePrompt() {
  const response = await client.responses.create({
    model: TEXT_MODEL,
    input: STARTING_PROMPT,
  });
  
  return response.output_text;
}
