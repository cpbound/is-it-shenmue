// src/App.jsx
import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setResult({
      title: query,
      shenmueness: Math.floor(Math.random() * 101),
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6">Is It Shenmue?</h1>
      <form onSubmit={handleSearch} className="mb-6 flex space-x-2">
        <input
          type="text"
          placeholder="Search for a game..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Check
        </button>
      </form>

      {result && (
        <div className="bg-white shadow-md rounded-lg p-4 w-80 text-center">
          <h2 className="text-xl font-semibold mb-2">{result.title}</h2>
          <p className="text-gray-700">
            Shenmueness Score:{" "}
            <span className="font-bold text-blue-600">{result.shenmueness}%</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
