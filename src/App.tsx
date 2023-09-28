import { useState } from "react";
import "./App.css";

function App() {
  const [spin, setSpin] = useState(false);

  const spinHandler = () => {
    setSpin(!spin);
  };

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
          <div className={`spinner ${spin && "spin"}`}></div>
        </section>
      </section>
    </>
  );
}

export default App;
