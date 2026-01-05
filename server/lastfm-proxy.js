import http from 'http';
import { URL } from 'url';

// Try to load environment from .env.local if present (optional)
import fs from 'fs';
const envPath = new URL('../../.env.local', import.meta.url).pathname;
if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, 'utf8');
  env.split(/\r?\n/).forEach(line => {
    const m = line.match(/^\s*([A-Za-z0-9_]+)=(.*)$/);
    if (m) {
      const key = m[1];
      let val = m[2] || '';
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      process.env[key] = process.env[key] ?? val;
    }
  });
}

const API_KEY = process.env.LASTFM_API_KEY || process.env.VITE_LASTFM_API_KEY;
const PORT = process.env.LASTFM_PROXY_PORT || 5178;

if (!API_KEY) {
  console.warn('Warning: LASTFM API key not found in environment. Set LASTFM_API_KEY or VITE_LASTFM_API_KEY.');
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname !== '/lastfm') {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not found' }));
      return;
    }

    const user = url.searchParams.get('user');
    if (!user) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing user query param' }));
      return;
    }

    if (!API_KEY) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Server missing Last.fm API key' }));
      return;
    }

    const target = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(user)}&api_key=${API_KEY}&format=json&limit=1`;

    const r = await fetch(target);
    const body = await r.text();

    // Allow CORS from localhost and your site during dev
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(body);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: String(err) }));
  }
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Last.fm proxy listening on http://localhost:${PORT}/lastfm?user=YOUR_USER`);
});
