import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { githubDark } from "@uiw/codemirror-theme-github";
import { autocompletion } from "@codemirror/autocomplete";

const CodeEditor = ({ language, code, setCode, fontSize }) => {
  const getExtension = () => {
    const langExt =
      language === "cpp" || language === "c" ? cpp()
      : language === "java" ? java()
      : language === "python" ? python()
      : [];

    return [langExt, autocompletion()];
  };

  return (
    <div className="h-full overflow-auto border border-yellow-500 rounded shadow-md">
      <CodeMirror
        value={code}
        height="100%"
        theme={githubDark}
        extensions={getExtension()}
        onChange={(value) => setCode(value)}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          foldGutter: true,
          tabSize: 2,
        }}
        style={{
          fontSize: `${fontSize}px`,
          fontFamily: "'Fira Code', monospace",
          height: "100%",
        }}
      />
    </div>
  );
};

export default CodeEditor;
