import { env } from "../env";
import type { OAuthUserProfile } from "./google";

export function getGithubAuthUrl(state: string, redirectUri: string) {
  if (!env.GITHUB_CLIENT_ID) {
    throw new Error("GitHub OAuth is not configured");
  }

  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: redirectUri,
    scope: "read:user user:email",
    state,
  });

  return `https://github.com/login/oauth/authorize?${params.toString()}`;
}

export async function getGithubUserFromCode(
  code: string,
  redirectUri: string,
): Promise<OAuthUserProfile> {
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    throw new Error("GitHub OAuth is not configured");
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error("Failed to exchange GitHub authorization code");
  }

  const tokenData = (await tokenResponse.json()) as { access_token?: string; error?: string };

  if (!tokenData.access_token) {
    throw new Error(tokenData.error ?? "No access token received from GitHub");
  }

  const accessToken = tokenData.access_token;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "romexform-app",
  };

  const userResponse = await fetch("https://api.github.com/user", { headers });

  if (!userResponse.ok) {
    throw new Error("Failed to fetch GitHub user profile");
  }

  const user = (await userResponse.json()) as {
    id?: number;
    login?: string;
    name?: string | null;
    email?: string | null;
  };

  if (!user.id) {
    throw new Error("GitHub account is missing required profile information");
  }

  let email = user.email;

  if (!email) {
    const emailsResponse = await fetch("https://api.github.com/user/emails", { headers });

    if (emailsResponse.ok) {
      const emails = (await emailsResponse.json()) as Array<{
        email: string;
        primary: boolean;
        verified: boolean;
      }>;

      const primaryVerified = emails.find((entry) => entry.primary && entry.verified);
      const primary = emails.find((entry) => entry.primary);
      email = primaryVerified?.email ?? primary?.email ?? emails[0]?.email;
    }
  }

  if (!email) {
    throw new Error("GitHub account does not expose a verified email address");
  }

  return {
    providerId: String(user.id),
    email,
    fullName: user.name ?? user.login ?? email.split("@")[0] ?? "User",
  };
}
