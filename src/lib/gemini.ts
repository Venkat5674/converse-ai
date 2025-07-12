import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDEIgO_J05-NxuOqL3SFOl3FxHCcYS7L3U");

export async function generateGeminiResponse(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Enhanced prompt for code explanations
    let enhancedPrompt = prompt;
    if (prompt.toLowerCase().includes('code') || prompt.includes('```')) {
      enhancedPrompt = `Please provide a detailed explanation for the following code or request. Include:
1. Purpose and functionality
2. Key components and their roles
3. Important concepts used
4. Best practices demonstrated
5. Potential improvements or alternatives
6. Example use cases

${prompt}`;
    }
    
    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating Gemini response:', error);
    throw error;
  }
}

export async function analyzeImageWithGemini(file: File): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Compress image before converting to base64
    const compressedImage = await compressImage(file);
    
    // Convert compressed File to base64
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(compressedImage);
    });

    // Enhanced prompt for detailed image analysis with improved formatting
    const prompt = `Please provide a detailed analysis of this image. Include:

1. Main Subject(s)
   Describe the primary objects, people, or elements
   Their characteristics and positioning
   Actions or interactions

2. Visual Elements
   Color scheme and palette
   Lighting conditions and effects
   Composition and layout
   Perspective and depth

3. Technical Details
   Image quality and resolution
   Photography/creation technique
   Notable post-processing or effects

4. Context and Setting
   Location or environment
   Time period or era
   Weather or atmospheric conditions
   Cultural or historical references

5. Notable Details
   Unique features or elements
   Text or symbols present
   Patterns or recurring elements
   Hidden or subtle details

6. Emotional/Artistic Impact
   The image evokes [describe the mood and atmosphere]
   The style incorporates [describe artistic elements]
   Viewers might experience [describe emotional response]
   The purpose appears to be [describe intended message]

Please provide a natural, flowing analysis without bullet points or markers. Format the response as continuous paragraphs under each main section heading.`;

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: compressedImage.type,
          data: base64Data
        }
      },
      prompt
    ]);
    
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error analyzing image with Gemini:', error);
    if (error instanceof Error) {
      return `Sorry, I encountered an error while analyzing the image: ${error.message}. Please try again with a different image or check if the image format is supported (PNG, JPEG, WEBP, HEIC, or HEIF).`;
    }
    return "Sorry, I encountered an error while analyzing the image. Please try again with a different image.";
  }
}

// Helper function to compress image
async function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Calculate new dimensions while maintaining aspect ratio
      let width = img.width;
      let height = img.height;
      const maxDimension = 800; // Maximum dimension for either width or height
      
      if (width > height && width > maxDimension) {
        height = (height * maxDimension) / width;
        width = maxDimension;
      } else if (height > maxDimension) {
        width = (width * maxDimension) / height;
        height = maxDimension;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress image
      ctx?.drawImage(img, 0, 0, width, height);
      
      // Convert to blob with reduced quality
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        'image/jpeg',
        0.8 // Compression quality (0.8 = 80% quality)
      );
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
  });
}