export interface Env {
  LASTFM_API_KEY?: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const url = new URL(context.request.url);
    const user = url.searchParams.get("user");
    if (!user) {
      return new Response(JSON.stringify({ error: "Missing user query param" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-store",
        },
      });
    }

    const apiKey = context.env.LASTFM_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Server missing Last.fm API key" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-store",
          },
        }
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
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store",
      },
    });
  }
};
