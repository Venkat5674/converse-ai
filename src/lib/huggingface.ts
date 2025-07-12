import { HfInference } from "@huggingface/inference";

export const hfClient = new HfInference("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");

export async function generateImage(prompt: string): Promise<string> {
  const image = await hfClient.textToImage({
    model: "stabilityai/stable-diffusion-3.5-large-turbo",
    inputs: prompt,
    parameters: { num_inference_steps: 5 },
    provider: "hf-inference",
  });

  return URL.createObjectURL(image);
}

export async function analyzeImage(imageFile: File): Promise<string> {
  const imageData = await imageFile.arrayBuffer();
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base",
    {
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: imageData,
    }
  );
  const result = await response.json();
  return Array.isArray(result) ? result[0].generated_text : result.generated_text;
}

export async function summarizeText(text: string): Promise<string> {
  const chatCompletion = await hfClient.chatCompletion({
    model: "deepseek-ai/DeepSeek-R1",
    messages: [
      {
        role: "user",
        content: text,
      },
    ],
    provider: "together",
    max_tokens: 500,
  });

  return chatCompletion.choices[0].message.content;
}