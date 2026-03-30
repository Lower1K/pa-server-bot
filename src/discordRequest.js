/*
Handles the interaction side of the Discord handshake for interaction endpoint
*/

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const body = await request.text();

    const signature = request.headers.get("x-signature-ed25519");
    const timestamp = request.headers.get("x-signature-timestamp");

    const isValid = await verifyDiscordRequest(
      body,
      signature,
      timestamp,
      env.DISCORD_PUBLIC_KEY
    );

    if (!isValid) {
      return new Response("Invalid request", { status: 401 });
    }

    const json = JSON.parse(body);

    // Respond to Discord PING
    if (json.type === 1) {
      return Response.json({ type: 1 });
    }

    // Example slash command response
    if (json.type === 2) {
      return Response.json({
        type: 4,
        data: {
          content: "Hello from Cloudflare Workers 👋",
        },
      });
    }

    return new Response("Unhandled interaction", { status: 400 });
  },
};
