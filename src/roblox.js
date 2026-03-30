// src/roblox.js

// 🔹 Get user ID from username
export async function getUserId(username) {
  const res = await fetch("https://users.roblox.com/v1/usernames/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usernames: [username],
      excludeBannedUsers: true,
    }),
  });

  const data = await res.json();

  if (!data.data || data.data.length === 0) {
    return null;
  }

  return data.data[0].id;
}

// 🔹 Get presence (online / in game)
export async function getUserPresence(userId) {
  const res = await fetch("https://presence.roblox.com/v1/presence/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userIds: [userId],
    }),
  });

  const data = await res.json();

  return data.userPresences?.[0] || null;
}

// 🔹 Combined helper
export async function getUserStatus(username) {
  const userId = await getUserId(username);

  if (!userId) {
    return {
      error: "User not found",
    };
  }

  const presence = await getUserPresence(userId);

  if (!presence) {
    return {
      error: "Could not fetch presence",
    };
  }

  return {
    status: presence.userPresenceType, // 0=offline, 1=online, 2=in game
    placeId: presence.placeId,
    universeId: presence.universeId,
    lastOnline: presence.lastOnline,
  };
}
