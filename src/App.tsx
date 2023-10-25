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
    } else if (sectors < 7) {
      const calculatedValue = 100 / sectors;
      const percentMinusCalculatedValue = 100 - calculatedValue;

      if (sectors === 6) {
        setSectorStyle({
          clipPath: `polygon(${
            calculatedValue * 2
          }% 0px, 50% 50%, ${percentMinusCalculatedValue}% ${calculatedValue}% , 100% 0px)`,
        });
      } else {
        setSectorStyle({
          clipPath: `polygon(${calculatedValue}% 0px, 50% 50%, ${percentMinusCalculatedValue}% ${calculatedValue}% , 100% 0px)`,
        });
      }
    } else if (sectors === 7) {
      setSectorStyle({
        clipPath: `polygon(56% 0px, 50% 50%, 0% 0px, 100% 0px)`,
      });
    } else if (sectors === 8) {
      setSectorStyle({
        clipPath: `polygon(51% 0px, 50% 50%, 0% 0px, 100% 0px)`,
      });
    } else if (sectors > 8) {
      setSectorStyle({
        clipPath: `polygon(50% 0px, 50% 50%, 0% 0px, 100% 0px)`,
      });
    }
  }, [sectors]);

  const createSectors = () => {
    let sectorsElements = [];
    for (let i = 0; i < sectors; i++) {
      // last child keeps coming out too large....
      const lastChild = i === sectors - 1;

      if (lastChild && sectors > 9) {
        sectorsElements.push(
          <div
            style={{
              transform: `rotate(${(i * 360) / sectors}deg)`,
              backgroundColor: `hsl(${(i * 360) / sectors}, 100%, 50%)`,
              height: "100%",
              width: "100%",
              clipPath: `polygon(45% 0px, 50% 50%, 0% 0px, 100% 0px)`,
              position: "absolute",
            }}
            className={`sector-${i + 1}`}
          ></div>
        );
        break;
      }

      if (lastChild && sectors > 10) {
        sectorsElements.push(
          <div
            style={{
              transform: `rotate(${(i * 360) / sectors}deg)`,
              backgroundColor: `hsl(${(i * 360) / sectors}, 100%, 50%)`,
              height: "100%",
              width: "100%",
              clipPath: `polygon(40% 0px, 50% 50%, 0% 0px, 100% 0px)`,
              position: "absolute",
            }}
            className={`sector-${i + 1}`}
          ></div>
        );
        break;
      }

      // style the sectors so that they take up equal space relative to the number of sectors
      sectorsElements.push(
        <div
          style={{
            transform: `rotate(${(i * 360) / sectors}deg)`,
            backgroundColor: `hsl(${(i * 360) / sectors}, 100%, 50%)`,
            height: "100%",
            width: "100%",
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
          <div className={`spinner ${spin && "spin"}`}>{createSectors()}</div>
        </section>
      </section>
    </>
  );
}

export default App;
