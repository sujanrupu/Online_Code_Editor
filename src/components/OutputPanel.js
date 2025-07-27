import React from "react";

const OutputPanel = ({
  input,
  setInput,
  handleRun,
  handleAnalyze,
  handleImproveCode,
  codeOutput,
  metrics
}) => {
  return (
    <div className="w-1/2 flex flex-col">
      <div className="h-1/2 p-3 bg-[#1f2937] border-b border-slate-800">
        <h2 className="text-lg font-semibold text-blue-300 mb-2">Custom Input</h2>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-full bg-[#0f172a] text-white p-3 rounded border border-slate-700 resize-none"
          placeholder="Enter input..."
        ></textarea>
      </div>
      <div className="h-1/2 p-3 bg-[#1f2937] flex flex-col gap-2 overflow-auto">
        <div className="flex gap-2 mb-2">
          <button onClick={handleRun} className="bg-green-600 hover:bg-green-500 px-3 py-2 rounded">▶ Run</button>
          <button onClick={handleAnalyze} className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded">⏱ Analyze</button>
          <button onClick={handleImproveCode} className="bg-purple-600 hover:bg-purple-500 px-3 py-2 rounded">✨ Improve</button>
        </div>
        <h2 className="text-lg font-semibold text-blue-300">Output</h2>
        <div className="flex-grow min-h-[150px] bg-[#0f172a] p-3 rounded border border-slate-700 overflow-auto">
          <pre className="text-sm whitespace-pre-wrap">{codeOutput}</pre>
          {metrics}
        </div>
      </div>
    </div>
  );
};

export default OutputPanel;
