export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // This part secures your API Key
    if (url.pathname === '/api/tts' && request.method === 'POST') {
      const body = await request.json();
      const response = await fetch("https://api.sarvam.ai/text-to-speech", {
        method: "POST",
        headers: {
          "api-subscription-key": env.SARVAM_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // Serve normal website assets
    return env.ASSETS.fetch(request);
  }
};

