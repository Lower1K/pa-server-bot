import { verifyDiscordRequest } from "./verify";

export async function handleDiscordRequest(request, env) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const signature = request.headers.get("x-signature-ed25519");
  const timestamp = request.headers.get("x-signature-timestamp");

  const body = await request.text();

  const isValid = await verifyDiscordRequest(
    body,
    signature,
    timestamp,
    env.DISCORD_PUBLIC_KEY
  );

  if (!isValid) {
    return new Response("Invalid request signature", { status: 401 });
  }

  const json = JSON.parse(body);

  // Discord PING (required for endpoint validation)
  if (json.type === 1) {
    return Response.json({ type: 1 });
  }

  // Slash command handler
  if (json.type === 2) {
    const commandName = json.data.name;

    if (commandName === "test") {
      return Response.json({
        type: 4,
        data: {
          content: "Hello world!",
        },
      });
    }
	else if (commandName === "awwww") {
		return Response.json({
			type: 4,
			data: {
				content: "[Insert cute image here]",
			},
		});
	}
	else if (commandName === "invite") {
		return Response.json({
			type: 4,
			data: {
				content: "[Insert server invite here]",
			},
		});
	}
	else if (commandName === "kevin-status") {
		return Response.json({
			type: 4,
			data: {
				content: kevinSpinBaddie ? "Kevin IS on 'Spin A Baddie'" : "Kevin is NOT on 'Spin A Baddie'",
			},
		});
	}

    // Default fallback
    return Response.json({
      type: 4,
      data: {
        content: `Unknown command: ${commandName}`,
      },
    });
  }

  return new Response("Unhandled interaction type", { status: 400 });
}
