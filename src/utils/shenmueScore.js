// src/utils/shenmueScore.js
export function calculateShenmueness(game) {
  let score = 0;

  // Genre match (50% weight)
  const shenmueGenres = ["Adventure", "Action", "Open World"];
  const genreMatch = game.genres?.some((g) => shenmueGenres.includes(g));
  if (genreMatch) score += 50;

  // Title similarity (20% weight)
  if (game.title.toLowerCase().includes("shen")) score += 20;

  // Length (20% weight)
  if (game.playtime && game.playtime >= 20) score += 20; // long enough

  // Platform match (10% weight)
  const shenmuePlatforms = ["Dreamcast", "Xbox", "PlayStation"];
  const platformMatch = game.platforms?.some((p) => shenmuePlatforms.includes(p));
  if (platformMatch) score += 10;

  return Math.min(score, 100); // cap at 100%
}
