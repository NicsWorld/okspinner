import "./App.css";
import Spinner from "./Spinner";
export default function App() {
  const segments = ["Happy", "Angry", "Sad", "Frustration"];
  const segmentColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0"];
  const onFinished = (winner: any) => {
    console.log(winner);
  };
  return (
    <div className="App">
      <div className="wrapper">
        <section className="control-panel">Controls</section>
        <div id="wheelCircle">
          <Spinner
            segments={segments}
            size={290}
            segmentColors={segmentColors}
            // segColors={segColors}
            // onFinished={onFinished}
          />
        </div>
      </div>
    </div>
  );
}
