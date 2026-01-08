export interface Env {
  LASTFM_API_KEY?: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const user = context.url.searchParams.get("user");
  if (!user) {
    return Response.json({ error: "Missing user query param" }, { status: 400 });
  }

  const apiKey = context.env.LASTFM_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Server missing Last.fm API key" },
      { status: 500 }
    );
  }

  const target = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(
    user
  )}&api_key=${encodeURIComponent(apiKey)}&format=json&limit=1`;

  const r = await fetch(target);
  const body = await r.text();

  return new Response(body, {
    status: r.status,
    headers: {
      "Content-Type": "application/json",
      // Same-origin on Pages, but leaving permissive CORS matches your local proxy behavior.
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
    },
  });
};
