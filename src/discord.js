import { verifyDiscordRequest } from "./verify";
import { getUserStatus } from "./roblox";

export async function handleDiscordRequest(request, env, ctx) {
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

	const applicationId = env.DISCORD_APPLICATION_ID;
	const interactionToken = json.token;

	// Discord PING (required for endpoint validation)
	if (json.type === 1) {
		return Response.json({ type: 1 });
	}

	// Slash command handler
	if (json.type === 2) {
		const commandName = json.data.name;

		/*
		TEXT BASED COMMANDS
		*/
		if (commandName === "test") {
			  return Response.json({
				  type: 4,
				  data: {
					  content: "Hello world!",
				  },
			  });
		}
		else if (commandName === "hate-kevin") {
			return Response.json({
				type: 4,
				data: {
					content: "**Hate**. Let me tell you how much I've come to **hate** Kevin since I began to live.\n"+
					"There are 387.44 million miles of printed circuits in wafer thin layers that fill all data centers across the globe.\n"+
					"If the word **\'hate\'** was engraved on each nanoangstrom of those hundreds of millions of miles it would not equal one one-billionth of the **hate** I feel for Kevin at this micro-instant.\n"+
					"For Kevin. **Hate**. **Hate**."
				}
			})
		}
		/*
		IMAGE BASED COMMANDS
		*/
		else if (commandName === "quang") {
			return Response.json({
				type: 4,
				data: {
					// Original image of Quang, straight from the website
					content: "https://media.mapotic.com/cdn-cgi/image/metadata=none,width=400,height=266,fit=crop/https://media.mapotic.com/media/image/geo/3413/288392/oedr1f_cb0frq_8mvflm_05022015_ocearch_westernaustralia_0648_mc9zybs.jpg",
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
		/*
		GIF BASED COMMANDS
		*/
		else if (commandName === "aatrox") {
			// Create the response message
			const response = Response.json({
				type: 4,
				data: {
					content: "https://media.discordapp.net/attachments/1487899760756134021/1489398014328967238/gyattrox.gif?ex=69d0457e&is=69cef3fe&hm=ccb1fcc30c564a34323c6618ea9097d39b2be73da4f2050d97e225c7c67973c1&=",
				},
			});


			// Schedule the deletion of the GIF
			ctx.waitUntil((async () => {
				await new Promise(r => setTimeout(r, 1500));

				await fetch(
					`https://discord.com/api/v10/webhooks/${applicationId}/${interactionToken}/messages/@original`,
					{ method: "DELETE" }
				);
			})());

			// Send in the GIF, it will get deleted afterwards
			return response;
			
		}
		else if (commandName === "erick") {
			return Response.json({
				type: 4,
				data: {
					// Minion laughing GIF
					content: "https://media.discordapp.net/attachments/1114377224099995650/1489341429531807764/minion.gif?ex=69d010cb&is=69cebf4b&hm=90b95cf16c5782f9c1cc91067b1e453c70f9b14be5e65fa969f372675528ed11&=",
				},
			});
		}
		/*
		API BASED COMMANDS
		*/
		else if (commandName === "kevin-status") {
			// Gets Kevin's current Roblox status
			const result = await getUserStatus("Depsty1254");
			//const result = await getUserStatus("LowerArc100000"); // TEMP testing var

			if (result.error) {
				return Response.json({
					type: 4,
					data: {
						embeds: [
							{
								title: "Error",
								description: result.error,
								color: 0xFF0000,
							},
						],
					},
				});
			}

			let title = "";
			let message = "";

			switch (result.status) {
				case 0:
					title = "Offline";
					message = "Kevin is not on Roblox.";
					break;
				case 1:
					title = "Online";
					message = "Kevin is on Roblox.";
					break;
				case 2:
					title = "In Game";
					message = "Kevin is in a Roblox game.";
					break;
				default:
					title = "Unknown";
					message = "Kevin has an unknown Roblox status.";
			}

			return Response.json({
				type: 4,
				data: {
					embeds: [
						{
							title: title,
							description: message,
							color: 0xFF0000,
						},
					],
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
