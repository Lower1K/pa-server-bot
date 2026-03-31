import { verifyDiscordRequest } from "./verify";
import { getUserStatus } from "./roblox";
import { getRiotStats } from "./league.js";

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
			// Gets Kevin's current Roblox status
			const result = await getUserStatus("Depsty1254");

			if (result.error) {
				return Response.json({
					type: 4,
					data: {
						content: `Error: ${result.error}`,
					},
				});
			}

			let message = "";

			switch (result.status) {
				case 0:
					message = "Kevin is not on Roblox.";
					break;
				case 1:
					message = "Kevin is on Roblox.";
					break;
				case 2:
					message = `Kevin is in a Roblox game. ${result.placeMessage}`;
					break;
				default:
					message = "Kevin has an unknown Roblox status.";
			}

			return Response.json({
				type: 4,
				data: {
					content: message,
				},
			});
		}
		else if (commandName === "league-playtime") {
			const gameName = json.data.options?.find(o => o.name === "gamename")?.value;
			const tagLine = json.data.options?.find(o => o.name === "tagline")?.value;

			const result = await getRiotStats(gameName, tagLine, env.RIOT_API_KEY);

			if (result.error) {
				return Response.json({
					type: 4,
					data: { content: `Error: ${result.error}` },
				});
			}

			return Response.json({
				type: 4,
				data: {
					content:
					`${result.gameName}#${result.tagLine}\n` +
					`Playtime (last ${result.matchesAnalyzed} games): ${result.totalHours} hours\n` +
					`Record: ${result.wins}W - ${result.losses}L`,
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
