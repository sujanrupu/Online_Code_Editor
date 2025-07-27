import React from "react";
import CodeEditor from "./CodeEditor";
import { LANGUAGE_OPTIONS } from "../constants";

const EditorPanel = ({ language, setLanguage, code, setCode, handleFormat, handleReset, fontSize, setFontSize }) => {
  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    setCode(LANGUAGE_OPTIONS[selectedLang].defaultCode);
  };

  return (
    <div className="w-1/2 p-3 bg-[#111827] border-r border-slate-800 h-full flex flex-col">
      <div className="flex justify-between items-center mb-2 bg-[#0e1525] p-2 rounded-t">
        <select
          className="bg-[#1f2937] text-white px-2 py-1 rounded text-sm"
          value={language}
          onChange={handleLanguageChange}
        >
          {Object.entries(LANGUAGE_OPTIONS).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <button onClick={handleFormat} className="bg-slate-700 hover:bg-slate-600 px-2 py-1 text-sm rounded">Format</button>
          <button onClick={handleReset} className="bg-red-700 hover:bg-red-600 px-2 py-1 text-sm rounded">Reset</button>
          <select value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="bg-slate-700 text-white text-sm rounded px-2 py-1">
            {[12, 14, 16, 18, 20, 24].map((size) => (
              <option key={size} value={size}>{size}px</option>
            ))}
          </select>
        </div>
      </div>
      <div className="border-2 border-yellow-500 rounded-b h-full overflow-hidden">
        <CodeEditor language={language} code={code} setCode={setCode} fontSize={fontSize} />
      </div>
    </div>
  );
};

export default EditorPanel;
