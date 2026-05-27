import { OAuth2Client } from "google-auth-library";
import { env } from "../env";

export type OAuthUserProfile = {
  providerId: string;
  email: string;
  fullName: string;
};

export function createGoogleOAuthClient(redirectUri: string) {
  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Google OAuth is not configured");
  }

  return new OAuth2Client(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET, redirectUri);
}

export function getGoogleAuthUrl(client: OAuth2Client, state: string) {
  return client.generateAuthUrl({
    access_type: "online",
    scope: ["openid", "email", "profile"],
    state,
    prompt: "select_account",
  });
}

export async function getGoogleUserFromCode(
  client: OAuth2Client,
  code: string,
): Promise<OAuthUserProfile> {
  const { tokens } = await client.getToken(code);
  const accessToken = tokens.access_token;

  if (!accessToken) {
    throw new Error("No access token received from Google");
  }

  const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Google user profile");
  }

  const data = (await response.json()) as {
    id?: string;
    email?: string;
    name?: string;
  };

  if (!data.id || !data.email) {
    throw new Error("Google account is missing required profile information");
  }

  return {
    providerId: data.id,
    email: data.email,
    fullName: data.name ?? data.email.split("@")[0] ?? "User",
  };
}
