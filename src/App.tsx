import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [spin, setSpin] = useState(false);
  const [sectors, setSectors] = useState<number>(4);
  const spinHandler = () => {
    setSpin(!spin);
  };

  useEffect(() => {
    if (spin) {
      setTimeout(() => {
        setSpin(false);
      }, 1000);
    }
  }, [spin]);

  const createSectors = () => {
    let sectorsElements = [];
    for (let i = 0; i < sectors; i++) {
      // style the sectors so that they are evenly spaced in the spinner
      const styledSector = {
        transform: `rotate(${(i * 360) / sectors}deg) skewY(${
          180 / sectors
        }deg)`,
        backgroundColor: `hsl(${(i * 360) / sectors}, 100%, 50%)`,
      };
      sectorsElements.push(
        <div
          style={{
            // transform: `rotate(${(i * 360) / sectors}deg) skewY(${
            //   180 / sectors
            // }deg)`,
            transform: `rotate(${(i * 360) / sectors}deg)`,
            backgroundColor: `hsl(${(i * 360) / sectors}, 100%, 50%)`,
            height: "100%",
            width: "100%",
            clip: `rect(${i % 2 ? "150px" : "0px"}, 150px, 300px, 0px)`,
            position: "absolute",
          }}
          className={`sector-${i + 1}`}
        ></div>
      );
    }

    return sectorsElements;
  };

  return (
    <>
      <section className="header">
        <h1>Ok spinner</h1>
        <input
          type="number"
          placeholder="Enter number of sectors"
          value={sectors}
          onChange={(e) => {
            setSectors(parseInt(e.target.value));
          }}
        />
      </section>
      <section className="home">
        <section className="spinner-body">
          <button
            onClick={() => {
              spinHandler();
            }}
          >
            Spin
          </button>
          <div className={`spinner ${spin && "spin"}`}>
            {/* <div className="sector-1"></div>
            <div className="sector-2"></div>

            <div className="sector-3"></div>
            <div className="sector-4"></div> */}
            {createSectors()}
          </div>
        </section>
      </section>
    </>
  );
}

export default App;
