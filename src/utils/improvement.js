import { GoogleGenerativeAI } from "@google/generative-ai";
import { stripMarkdown, stripImprovementMarkdown } from "./stripMarkdown";

const genAI = new GoogleGenerativeAI("AIzaSyBV-WuZ4o2Ja57tgdGZQlfQoxy07Fmy9Zg");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Improve the code (performance, readability, best practices)
 * Returns only improved code with inline comments (safely extracted)
 */
export async function improveCode(code) {
  const prompt = `Improve the following code in terms of performance, readability, and best practices. 
Add brief inline comments explaining any changes you make. After the improved code, include a bullet point summary of what was changed:\n\n${code}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = await response.text();

    console.log("🔧 Gemini (improve) Raw Output:\n", rawText);

    const cleanOutput = stripImprovementMarkdown(rawText);
    return cleanOutput;
  } catch (error) {
    console.error("Gemini API (improveCode) error:", error);
    return "❌ Failed to improve code.";
  }
}


/**
 * Format the code without changing logic or variable names
 * Returns properly indented and structured code
 */
export async function formatCode(code, language) {
  const prompt = `Format the following ${language} code with proper indentation and structure. 
Do not modify any logic or variable names. Return only the formatted code inside a single code block:\n\n${code}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = await response.text();

    console.log("✨ Gemini (format) Raw Output:\n", rawText);

    const cleaned = stripMarkdown(rawText);
    return cleaned && cleaned.trim() ? cleaned : code; // fallback
  } catch (error) {
    console.error("Gemini API (formatCode) error:", error);
    return code; // fallback to original code
  }
}
