import { useEffect, useRef } from "react";
import * as Sk from "skulpt";
import "./Output.css";

interface IOutput {
  value: string;
  setIsSuccess: (value: boolean) => void;
  defaultValue: string;
}

export const Output: React.FC<IOutput> = ({
  value,
  setIsSuccess,
  defaultValue,
}) => {
  const outRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Sk.configure({
      output: (text: string) => {
        if (outRef.current) {
          outRef.current.innerHTML = text;
        }
      },
      read: (x: string) => Sk.builtinFiles["files"][x],
    });
  }, []);

  const run = () => {
    const promise = Sk.misceval.asyncToPromise(function () {
      return Sk.importMainWithBody("<stdin>", false, value, true);
    });
    promise.then(
      function () {
        if (defaultValue.trim() != value.trim()) {
          setIsSuccess(true);
        }
      },
      function (err: any) {
        if (outRef.current) outRef.current.innerHTML = err.toString();
        setIsSuccess(false);
      }
    );
  };

  return (
    <div className="output">
      <button onClick={run}>run</button>
      <div ref={outRef}></div>
    </div>
  );
};
