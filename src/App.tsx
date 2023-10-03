import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [spin, setSpin] = useState(false);
  const [sectors, setSectors] = useState<number>(4);
  const [sectorStyle, setSectorStyle] = useState({} as any);
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

  useEffect(() => {
    console.log("Sectors: ", sectors);

    if (sectors <= 4) {
      if (sectors === 1) {
        setSectorStyle({
          clipPath: `polygon(0% 0px, 0% 100%, 100% 100%, 100% 0px)`,
        });
        // polygon(0% 0px, 0% 100%, 100% 100%, 100% 0px)
      }
      if (sectors < 4 && sectors % 2 === 0) {
        setSectorStyle({
          clipPath: `polygon(0% 0px, 50% 50%, 100% 100% , 100% 0px)`,
        });
      } else if (sectors === 4) {
        setSectorStyle({
          clipPath: `polygon(50% 0px, 50% 50%, 100% 50% , 100% 0px)`,
        });
      } else {
        setSectorStyle({
          clipPath: `polygon(0% 0px, 50% 50%, 100% 50% , 100% 0px)`,
        });
      }
    } else {
      const calculatedValue = 100 / sectors;
      const percentMinusCalculatedValue = 100 - calculatedValue;
      setSectorStyle({
        clipPath: `polygon(${calculatedValue}% 0px, 50% 50%, ${percentMinusCalculatedValue}% ${calculatedValue}% , 100% 0px)`,
      });
    }
  }, [sectors]);

  const createSectors = () => {
    let sectorsElements = [];
    for (let i = 0; i < sectors; i++) {
      // style the sectors so that they are evenly spaced in the spinner
      sectorsElements.push(
        <div
          style={{
            transform: `rotate(${(i * 360) / sectors}deg)`,
            backgroundColor: `hsl(${(i * 360) / sectors}, 100%, 50%)`,
            height: "100%",
            width: "100%",
            // third from the right should be equal to the number of sectors, add up to 100% (not 50%)
            // clipPath: `polygon(50% 0px, 50% 50%, 100% calc(100% / ${sectors}) , 100% 0px)`,
            clipPath: sectorStyle.clipPath,
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
            createSectors();
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
