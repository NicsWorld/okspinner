import { useEffect, useState } from "react";
import "./App.css";
import Spinner from "./Spinner";
export default function App() {
  // const segments = ["Happy", "Angry", "Sad", "Frustration"];
  const [sectors, setSectors] = useState<string[]>([
    "Sally",
    "Mike",
    "Love",
    "Happy",
  ]);
  const [actualSectors, setActualSectors] = useState<string[]>(sectors);
  const segmentColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0"];

  const handleSectorUpdate = () => {
    // for each new line item, update teh sectors array
    // const newSectors = sectors.map((sector) => sector);
  };
  useEffect(() => {
    console.log("SECTORS from app", sectors);
    setActualSectors(sectors);
    // draw();
  }, [sectors]);
  return (
    <div className="App">
      <div className="wrapper">
        <section className="control-panel">
          Controls
          <button
            onClick={
              // call the spin function from inside the Spinner component
              () =>
                document
                  .getElementById("canvas")
                  ?.dispatchEvent(new Event("click"))
            }
          >
            Spin
          </button>
          <div onChange={() => handleSectorUpdate()}>
            {sectors.map((sector, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={sector}
                  onChange={(e) => {
                    const newSectors = sectors.map((sector, i) =>
                      i === index ? e.target.value : sector
                    );
                    setSectors(newSectors);
                  }}
                />
              </div>
            ))}
          </div>
        </section>
        <div id="wheelCircle">
          <Spinner
            sectors={actualSectors}
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
