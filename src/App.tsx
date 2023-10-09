import "./App.css";
import Spinner from "./Spinner";
export default function App() {
  const segments = [
    "Happy",
    "Angry",
    "Sad",
    "Frustration",
    "Emptyness",
    "Lol",
    "WTF",
    "OMG",
  ];
  const segmentColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000",
  ];
  const onFinished = (winner: any) => {
    console.log(winner);
  };
  return (
    <div className="App">
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
  );
}
