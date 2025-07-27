
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBV-WuZ4o2Ja57tgdGZQlfQoxy07Fmy9Zg");

export async function analyzeTimeComplexity(code) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Analyze the time complexity of the following code. Only give the Big O notation and a short explanation:\n\n${code}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Failed to analyze time complexity.";
  }
}
