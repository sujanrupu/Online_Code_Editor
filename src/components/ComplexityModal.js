import React from "react";

const ComplexityModal = ({ complexity, onClose }) => (
  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-[#0f172a] border border-sky-400 p-4 rounded w-[80%] max-h-[60vh] overflow-auto shadow-xl z-50">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold text-sky-300">Time Complexity</h3>
      <button onClick={onClose} className="text-red-400 font-bold">×</button>
    </div>
    <pre className="text-sm">{complexity}</pre>
  </div>
);

export default ComplexityModal;
