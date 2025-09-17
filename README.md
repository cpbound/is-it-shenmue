### `README.md`

````markdown
# Is it Shenmue?

A web app to check how close a video game is to *Shenmue*, using IGDB data.

## Features

- Search for games by title.
- Shows genres, platforms, and summary.
- Calculates a "Shenmue score" based on genres and platforms.
- Uses a backend proxy to safely access IGDB API and hide credentials.

---

## Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd is-it-shenmue
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set environment variables

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Fill in your **Twitch/IGDB credentials**:

```
TWITCH_CLIENT_ID=your_client_id
TWITCH_ACCESS_TOKEN=your_access_token
PORT=4000
```

> **Do not commit `.env`** — it contains secrets.

### 4. Run locally

* Start backend server only:

```bash
npm run dev-server
```

* Start frontend only:

```bash
npm run dev
```

* Start both concurrently:

```bash
npm run start
```

> Requires `concurrently` package (already included in dependencies).

---

## Deployment

* When deploying to Netlify:

  * Set the same environment variables (`TWITCH_CLIENT_ID`, `TWITCH_ACCESS_TOKEN`) in **Site settings → Build & deploy → Environment → Environment variables**.
  * The backend proxy will use them automatically.

---

## Future Improvements

* Refine the "Shenmue score" algorithm.
* Replace placeholder playtime with actual data from IGDB.
* Add mobile-friendly UI and animations.
* Support more granular scoring (title similarity, popularity, release year, etc.).

---

## License

MIT

```

---

This README makes it **safe for pushing to GitHub**, clearly explains how to set up `.env`, and gives collaborators everything they need.

If you want, I can also **add a diagram showing frontend ↔ backend ↔ IGDB flow** to make it visually clear. That’s often helpful in game-data projects like this. Do you want me to do that?
```
