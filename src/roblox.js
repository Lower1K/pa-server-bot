// Get user ID from username
export async function getUserId(username) {
	const res = await fetch("https://users.roblox.com/v1/usernames/users", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ usernames: [username], excludeBannedUsers: true }),
	});

	const data = await res.json();
	if (!data.data || data.data.length === 0) return null;

	return data.data[0].id;
}

// Get presence (online / in game)
export async function getUserPresence(userId) {
	const res = await fetch("https://presence.roblox.com/v1/presence/users", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ userIds: [userId] }),
	});

	const data = await res.json();
	return data.userPresences?.[0] || null;
}

// Optional: fetch place info if available
async function getPlaceInfo(universeId) {
	if (!universeId) return null;

	const res = await fetch(
		`https://games.roblox.com/v1/games?universeIds=${universeId}`
	);

	const data = await res.json();
	return data.data?.[0] || null;
}

// Combined helper with graceful place handling
export async function getUserStatus(username) {
	const userId = await getUserId(username);
	if (!userId) return { error: "User not found" };

	const presence = await getUserPresence(userId);
	if (!presence) return { error: "Could not fetch presence" };

	const status = presence.userPresenceType; // 0=offline, 1=online, 2=in game
	let placeMessage = null;

	if (status === 2) {
		// User is in a game
		if (presence.universeId) {
			const gameInfo = await getGameInfo(presence.universeId);

			placeMessage = gameInfo
				? `${gameInfo.name}`
				: "(Unknown game)";
		} else {
			placeMessage = "(Game info unavailable)";
		}
	}

	return {
		status,
		placeId: presence.placeId || null,
		universeId: presence.universeId || null,
		lastOnline: presence.lastOnline || null,
		placeMessage, // optional friendly string for the bot message
	};
}
