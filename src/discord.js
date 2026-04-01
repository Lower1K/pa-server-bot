import { verifyDiscordRequest } from "./verify";
import { getUserStatus } from "./roblox";
import { getRiotStats } from "./league";

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
			const gameName = json.data.options.find(o => o.name === "gamename").value;

			const result = await getRiotStats(gameName, env.RIOT_API_KEY);

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
		else if (commandName === "quang") {
			return Response.json({
				type: 4,
				data: {
					embeds: [
						{
							title: "QUANG!",
							// The original image of QUANG, straight from the website
							image: {
								url: "https://media.mapotic.com/cdn-cgi/image/metadata=none,width=400,height=266,fit=crop/https://media.mapotic.com/media/image/geo/3413/288392/oedr1f_cb0frq_8mvflm_05022015_ocearch_westernaustralia_0648_mc9zybs.jpg",
							},
							color: 0x00AE86,
						},
					],
				},
			});
		}
		else if (commandName === "erick") {
			return Response.json({
				type: 4,
				data: {
					// Minion laughing GIF
					content: "https://images-ext-1.discordapp.net/external/tyYtJe4r4pZKCQjHqY8k5N5yfpH2MgqrZJ2tHy6yBHc/https/media.tenor.com/Heegf9LK-vIAAAPo/bahaha-lol.mp4",
				},
			});
		}
		else if (commandName === "keanu-aatrox") {
			return Response.json({
				type: 4,
				data: {
					// The creature
					content: "https://media.discordapp.net/attachments/1251262347952128116/1450904311205728508/Aatrox_Keanu.png?ex=69cea8f0&is=69cd5770&hm=183093f08c309aec6d474ccd68ae98b9aaf9236e62012280f0ac96436ca7a904&=&format=webp&quality=lossless&width=720&height=960",
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
