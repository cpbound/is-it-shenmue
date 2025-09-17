// src/App.jsx
import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    // For now, just set a mock result until API is wired
    setResult({
      title: query,
      shenmueness: Math.floor(Math.random() * 101), // random score
    });
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Is It Shenmue?</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search for a game..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "0.5rem", width: "250px" }}
        />
        <button type="submit" style={{ marginLeft: "0.5rem", padding: "0.5rem" }}>
          Check
        </button>
      </form>

      {result && (
        <div>
          <h2>{result.title}</h2>
          <p>Shenmueness Score: {result.shenmueness}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
