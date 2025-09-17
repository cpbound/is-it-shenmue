import express from "express";
import axios from "axios";
import cors from "cors";
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(cors());

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const ACCESS_TOKEN = process.env.TWITCH_ACCESS_TOKEN;


// Helper function to fetch genre/platform names
const enrichGameData = async (games) => {
  const genreIds = new Set();
  const platformIds = new Set();

  games.forEach((g) => {
    if (g.genres) g.genres.forEach((id) => genreIds.add(id));
    if (g.platforms) g.platforms.forEach((id) => platformIds.add(id));
  });

  // Fetch all genres
  let genresMap = {};
  if (genreIds.size > 0) {
    const genreRes = await axios.post(
      "https://api.igdb.com/v4/genres",
      `where id = (${[...genreIds].join(",")}); fields id,name;`,
      {
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "text/plain",
        },
      }
    );
    genreRes.data.forEach((g) => (genresMap[g.id] = g.name));
  }

  // Fetch all platforms
  let platformsMap = {};
  if (platformIds.size > 0) {
    const platformRes = await axios.post(
      "https://api.igdb.com/v4/platforms",
      `where id = (${[...platformIds].join(",")}); fields id,name;`,
      {
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "text/plain",
        },
      }
    );
    platformRes.data.forEach((p) => (platformsMap[p.id] = p.name));
  }

  // Replace IDs with names
  return games.map((g) => ({
    ...g,
    genres: g.genres?.map((id) => genresMap[id]) || [],
    platforms: g.platforms?.map((id) => platformsMap[id]) || [],
  }));
};

// Proxy endpoint for searching games
app.post("/api/search", async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: "Missing query" });

  try {
    const response = await axios.post(
      "https://api.igdb.com/v4/games",
      `search "${query}"; fields name, genres, platforms, release_dates, summary, cover.url; limit 5;`,
      {
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "text/plain",
        },
      }
    );

    const enrichedGames = await enrichGameData(response.data);
    res.json(enrichedGames);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "IGDB request failed" });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
