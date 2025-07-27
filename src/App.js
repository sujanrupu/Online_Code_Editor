// File: App.jsx
import React from "react";
import Header from "./components/Header";
import EditorPanel from "./components/EditorPanel";
import OutputPanel from "./components/OutputPanel";
import Footer from "./components/Footer";
import ComplexityModal from "./components/ComplexityModal";
import ImprovementModal from "./components/ImprovementModal";
import useEditor from "./components/useEditor";

function App() {
  const editorProps = useEditor();

  return (
    <div className="h-screen w-full bg-[#0f172a] text-gray-100 font-mono overflow-hidden flex flex-col">
      <Header />
      <main className="flex flex-grow">
        <EditorPanel {...editorProps} />
        <OutputPanel {...editorProps} />
      </main>
      {editorProps.showComplexity && (
        <ComplexityModal complexity={editorProps.complexity} onClose={() => editorProps.setShowComplexity(false)} />
      )}
      {editorProps.showImprovement && (
        <ImprovementModal improvement={editorProps.improvement} onClose={() => editorProps.setShowImprovement(false)} />
      )}
      <Footer />
    </div>
  );
}

export default App;
