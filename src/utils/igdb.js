// src/utils/igdb.js
import axios from "axios";

export const searchGame = async (title) => {
  try {
    const res = await axios.post("http://localhost:4000/api/search", { query: title });
    return res.data;
  } catch (err) {
    console.error("Proxy search error:", err);
    return [];
  }
};
