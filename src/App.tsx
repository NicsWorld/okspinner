import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [spin, setSpin] = useState(false);

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

  return (
    <>
      <section className="header">
        <h1>Ok spinner</h1>
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
            <div className="sector-1"></div>
            <div className="sector-2"></div>

            <div className="sector-3"></div>
            <div className="sector-4"></div>
          </div>
        </section>
      </section>
    </>
  );
}

export default App;
