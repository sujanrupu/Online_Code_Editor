import { useState } from "react";
import axios from "axios";
import { analyzeTimeComplexity } from "../utils/gemini";
import { improveCode, formatCode } from "../utils/improvement";
import { LANGUAGE_OPTIONS } from "../constants";

const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com/submissions";
const HEADERS = {
  "content-type": "application/json",
  "X-RapidAPI-Key": import.meta.env.VITE_JUDGE0_KEY,
  "X-RapidAPI-Host": import.meta.env.VITE_JUDGE0_HOST,
};

function useEditor() {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(LANGUAGE_OPTIONS["cpp"].defaultCode);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [complexity, setComplexity] = useState("");
  const [improvement, setImprovement] = useState("");
  const [showComplexity, setShowComplexity] = useState(false);
  const [showImprovement, setShowImprovement] = useState(false);
  const [codeOutput, setCodeOutput] = useState("");
  const [metrics, setMetrics] = useState(null);
  const [fontSize, setFontSize] = useState(14);

  const handleFormat = async () => {
    const formatted = await formatCode(code, language);
    setCode(formatted);
  };

  const handleReset = () => {
    setCode(LANGUAGE_OPTIONS[language].defaultCode);
  };

  const handleRun = async () => {
    setCodeOutput("Running...");
    setMetrics(null);
    try {
      const response = await axios.post(
        `${JUDGE0_URL}?base64_encoded=false&wait=true`,
        {
          source_code: code,
          stdin: input,
          language_id: LANGUAGE_OPTIONS[language].id,
        },
        { headers: HEADERS }
      );

      const result = response.data;
      setCodeOutput(result.stdout || result.stderr || "No output.");
      setMetrics(
        <div className="mt-2 text-sm text-slate-400">
          <p>🧪 <strong>Execution Time:</strong> {result.time ?? "N/A"}s</p>
          <p>🧠 <strong>Memory Used:</strong> {result.memory ?? "N/A"} KB</p>
          <p>⚙️ <strong>Status:</strong> {result.status?.id} ({result.status?.description})</p>
        </div>
      );
    } catch (err) {
      setCodeOutput("Error running code.");
      setMetrics(null);
      console.error(err);
    }
  };

  const handleAnalyze = async () => {
    setShowComplexity(true);
    setComplexity("Analyzing...");
    const result = await analyzeTimeComplexity(code);
    setComplexity(result);
  };

  const handleImproveCode = async () => {
    try {
      setShowImprovement(true);
      setImprovement("🔧 Improving your code...");
      const result = await improveCode(code);
      setImprovement(result || "⚠️ Improvement failed or returned empty result.");
    } catch (error) {
      console.error("Error while improving code:", error);
      setImprovement("❌ An error occurred while improving the code.");
    }
  };

  return {
    language,
    setLanguage,
    code,
    setCode,
    input,
    setInput,
    codeOutput,
    metrics,
    fontSize,
    setFontSize,
    complexity,
    setComplexity,
    improvement,
    setImprovement,
    showComplexity,
    setShowComplexity,
    showImprovement,
    setShowImprovement,
    handleRun,
    handleAnalyze,
    handleImproveCode,
    handleReset,
    handleFormat,
  };
}

export default useEditor;
