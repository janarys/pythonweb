import { Editor } from "@monaco-editor/react";
import "./App.css";
import { Task } from "./components/Task/Task";
import { Output } from "./components/Output/Output";
import { useState } from "react";
import { data } from "./data";

function App() {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState(data[index].editorCode);
  const [isSuccess, setIsSuccess] = useState(false);
  const nextStep = () => {
    if (index < data.length - 1 && isSuccess) {
      setIndex(index + 1);
      setValue(data[index + 1].editorCode);
    }
  };
  const { task, editorCode } = data[index];

  return (
    <div className="App">
      <Task
        task={task}
        current={index}
        isSuccess={isSuccess}
        nextStep={nextStep}
      />
      <div className="vertical-layout">
        <Editor
          defaultLanguage="python"
          onChange={(e) => setValue(e ?? "")}
          defaultValue={editorCode}
          value={value}
          height="50vh"
        />
        <Output
          setIsSuccess={setIsSuccess}
          defaultValue={editorCode}
          value={value}
        />
      </div>
    </div>
  );
}

export default App;
