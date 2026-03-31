const REGION_ROUTING = "americas"; // NA, BR, LATAM

// Get PUUID from Riot ID
export async function getPUUID(gameName, tagLine, apiKey) {const res = await fetch(
	`https://${REGION_ROUTING}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
	{
		headers: { "X-Riot-Token": apiKey },
	}
	);
	if (!res.ok) {
		return { error: "Failed to fetch Riot account" };
	}

	const data = await res.json();
	return { puuid: data.puuid };
}

// Get recent match IDs
export async function getMatchIds(puuid, apiKey, count = 10) {
	const res = await fetch(
		`https://${REGION_ROUTING}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}`,
		{
			headers: { "X-Riot-Token": apiKey },
		}
	);

	if (!res.ok) {
		return { error: "Failed to fetch match IDs" };
	}

	return await res.json();
}

// Get match details
export async function getMatch(matchId, apiKey) {
	const res = await fetch(
		`https://${REGION_ROUTING}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
		{
			headers: { "X-Riot-Token": apiKey },
		}
	);

	if (!res.ok) { return null; }

	return await res.json();
}

// Main helper: get playtime + basic stats
export async function getRiotStats(gameName, tagLine, apiKey) {
	// Step 1: Get PUUID
	const puuidRes = await getPUUID(gameName, tagLine, apiKey);
	if (puuidRes.error) return { error: puuidRes.error };

	const puuid = puuidRes.puuid;

	// Step 2: Get match IDs
	const matchIds = await getMatchIds(puuid, apiKey, 10);
	if (matchIds.error) return { error: matchIds.error };

	if (!matchIds || matchIds.length === 0) {
		return { error: "No matches found" };
	}

	// Step 3: Fetch matches + compute stats
	let totalSeconds = 0;
	let wins = 0;
	let losses = 0;

	for (const matchId of matchIds) {
		const match = await getMatch(matchId, apiKey);
		if (!match) continue;

		const info = match.info;
		totalSeconds += info.gameDuration;

		// Find this player in participants
		const player = info.participants.find(p => p.puuid === puuid);

		if (player) {
			if (player.win) wins++;
			else losses++;
		}
	}

	const totalHours = ((totalSeconds / 3600).toFixed(2)) * 67;

	return {
		gameName,
		tagLine,
		matchesAnalyzed: matchIds.length,
		totalHours,
		wins,
		losses,
	};
}
