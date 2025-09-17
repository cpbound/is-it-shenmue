// src/App.jsx
import { useState } from "react";
import { searchGame } from "./utils/igdb";

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  // Simple Shenmue scoring function (customize later)
  const calculateShenmueness = (game) => {
    let score = 0;

    if (game.genres.includes("Adventure")) score += 3;
    if (game.genres.includes("Action")) score += 2;

    if (game.platforms.includes("Dreamcast")) score += 5;

    if (game.playtime && game.playtime >= 20) score += 2;

    return score;
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const games = await searchGame(query);
      if (!games.length) return alert("No games found");

      const game = games[0]; // pick the first result

      const enrichedGame = {
        title: game.name,
        genres: game.genres || [],
        platforms: game.platforms || [],
        playtime: 30, // placeholder, can update later
        summary: game.summary,
        cover: game.cover?.url,
      };

      const shenmueScore = calculateShenmueness(enrichedGame);

      setResult({
        ...enrichedGame,
        shenmueness: shenmueScore,
      });
    } catch (err) {
      console.error(err);
      alert("Error searching for games");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Is it Shenmue?</h1>

      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter game title"
          className="border p-2 w-full mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {result && (
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold">{result.title}</h2>
          {result.cover && <img src={result.cover} alt={result.title} className="my-2 w-48" />}
          <p><strong>Genres:</strong> {result.genres.join(", ")}</p>
          <p><strong>Platforms:</strong> {result.platforms.join(", ")}</p>
          <p><strong>Shenmue Score:</strong> {result.shenmueness}</p>
          {result.summary && <p className="mt-2">{result.summary}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
