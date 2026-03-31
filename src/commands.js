/**
 * Share command metadata from a common spot to be used for both runtime
 * and registration.
 */

export const AWW_COMMAND = {
  name: 'awwww',
  description: 'Drop some cuteness on this channel.',
};

export const INVITE_COMMAND = {
  name: 'invite',
  description: 'Get an invite link to add the bot to your server.',
};

export const TEST_COMMAND = {
	name: 'test',
	description: 'Sends a test message to the channel.',
};

export const KEVIN_COMMAND = {
	name: 'kevin-status',
	description: 'See what Kevin is currently up to on Roblox.',
};

export const LEAGUE_PLAYTIME = {
	name: "league-playtime",
	description: "Check League of Legends playtime",
	options: [
		{
			name: "gamename",
			description: "Riot Game name",
			type: 3,
			required: true,
		},
		{
			name: "tagline",
			description: "Riot tagline (e.g. NA1, EUW)",
			type: 3,
			required: true,
		},
	],
};
