export async function verifyDiscordRequest(
  body,
  signature,
  timestamp,
  publicKey
) {
  if (!signature || !timestamp) {
    return false;
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(timestamp + body);

  const signatureBytes = hexToUint8Array(signature);
  const publicKeyBytes = hexToUint8Array(publicKey);

  return await crypto.subtle.verify(
    {
      name: "NODE-ED25519",
    },
    await crypto.subtle.importKey(
      "raw",
      publicKeyBytes,
      {
        name: "NODE-ED25519",
        namedCurve: "NODE-ED25519",
      },
      false,
      ["verify"]
    ),
    signatureBytes,
    data
  );
}

function hexToUint8Array(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}
