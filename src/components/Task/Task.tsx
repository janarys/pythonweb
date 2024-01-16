import "./Tasks.css";
interface ITask {
  task: string;
  current: number;
  nextStep: () => void;
  isSuccess: boolean;
}

export const Task: React.FC<ITask> = ({
  task,
  current,
  nextStep,
  isSuccess,
}) => {
  return (
    <div className="task">
      <p>{task}</p>
      <div className="controls">
        <span>{current}</span>
        <button onClick={nextStep} disabled={!isSuccess}>
          next
        </button>
      </div>
    </div>
  );
};
