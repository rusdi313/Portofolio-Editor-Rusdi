import React from "react";
import "./index.css";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0, overflow: "hidden" }}>
      <iframe
        src="https://portofolio-rusdi.framer.website/"
        style={{ width: "100%", height: "100%", border: "none" }}
        title="Portofolio Rusdi"
        allowFullScreen
      />
    </div>
  );
}

export default App;