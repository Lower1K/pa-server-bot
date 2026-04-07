import { verifyDiscordRequest } from "./verify";
import { getUserStatus } from "./roblox";
import { quinnCats } from "./cats";

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
		/*
		if (commandName === "test") {
			  return Response.json({
				  type: 4,
				  data: {
					  content: "Hello world!",
				  },
			  });
		}
		*/
		if (commandName === "hate-kevin") {
			const kevinUserId = "1251196786723389515";

			return Response.json({
				type: 4,
				data: {
					content: `**Hate**. Let me tell you how much I've come to **hate** <@${kevinUserId}> since I began to live.\n`+
					"There are 387.44 million miles of printed circuits in wafer thin layers that fill all data centers across the globe.\n"+
					`If the word **\'hate\'** was engraved on each nanoangstrom of those hundreds of millions of miles it would not equal\n`+
					`one one-billionth of the **hate** I feel for <@${kevinUserId}> at this micro-instant.\n`+
					`For <@${kevinUserId}>. **Hate**. **Hate**.`
				}
			});
		}
		else if (commandName === "commands") {
			return Response.json({
				type: 4,
				data: {
					embeds: [
						{
							title: "Command List",
							description: "/aatrox\n/erick\n/hate-kevin\n/horse\n/janice-cheese\n/keanu-aatrox\n/kevin-status\n/quang\n/quinn-cat\n/skeleton",
							color: 0xFF0000,
						},
					],
				}
			});
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
					content: "https://drive.google.com/file/d/1ohXPhK99NY6KZg-lAmizGUhUkNS8-8Vk/view?usp=drive_link",
				},
			});
		}
		else if (commandName === "threat") {
			// Create the response image of the Erick image
			const response = Response.json({
				type: 4,
				data: {
					content: "https://drive.google.com/file/d/1ckHXaMKNQ9Aul0YNw50eb-XvJla9_QfV/view?usp=drive_link",
				},
			});

			// Schedule the deletion of the image
			ctx.waitUntil((async () => {
				await new Promise(r => setTimeout(r, 4000));

				await fetch(
					`https://discord.com/api/v10/webhooks/${applicationId}/${interactionToken}/messages/@original`,
					{ method: "DELETE" }
				);
			})());

			// Send in the GIF, it will get deleted afterwards
			return response;
		}
		else if (commandName === "janice-cheese") {
			// Sends the image of Janice Cheese
			return Response.json({
				type: 4,
				data: {
					content: "https://drive.google.com/file/d/1PnfOrqLUFMwzrv9byyX9prLQaE4NBNYH/view?usp=drive_link",
				},
			});
		}
		else if (commandName === "quinn-cat") {
			// Cats the image and index from the cat function
			const { catImage, index } = quinnCats();

			// Create the response message with the image
			const response = Response.json({
				type: 4,
				data: {
					content: catImage,
				},
			});

			// If we get the 'Nancy' image, schedule its deletion
			if (index === 42) {
				ctx.waitUntil((async () => {
					await new Promise(r => setTimeout(r, 7000));
				
					await fetch(
						`https://discord.com/api/v10/webhooks/${applicationId}/${interactionToken}/messages/@original`,
						{ method: "DELETE" }
					);
				})());
			}

			// Sends the message
			return response;
		}
		/*
		GIF BASED COMMANDS
		*/
		else if (commandName === "aatrox") {
			// Create the response message
			const response = Response.json({
				type: 4,
				data: {
					content: "https://drive.google.com/file/d/1E-IFN97lYyp1frqu9m6MPAaBDdJn3-OJ/view?usp=drive_link",
				},
			});


			// Schedule the deletion of the GIF
			ctx.waitUntil((async () => {
				await new Promise(r => setTimeout(r, 3000));

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
					content: "https://drive.google.com/file/d/1oPt4smQVWDRNTvIo0cwCG3-GAtFOtk1z/view?usp=drive_link",
				},
			});
		}
		else if (commandName === "horse") {
			return Response.json({
				type: 4,
				data: {
					// Horse middle-finger
					content: "https://drive.google.com/file/d/1MtbLDI1fOqqljmiV7oYaMNmuNXSyaUoU/view?usp=drive_link",
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
		/*
		VIDEO BASED COMMANDS
		*/
		else if (commandName === "skeleton") {
			return Response.json({
				type: 4,
				data: {
					// Skeleton spin video
					content: "https://drive.google.com/file/d/10wuLhOL9HEmPyMkYUEOxrE5y0mlOrDXi/view?usp=drive_link",
				}
			})
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
