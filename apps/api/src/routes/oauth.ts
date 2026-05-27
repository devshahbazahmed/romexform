import { randomBytes } from "node:crypto";
import type { Express, Request, Response } from "express";
import { userService } from "@repo/trpc/server/services";
import { setCookie, getCookie, clearCookie } from "@repo/trpc/server/utils/cookie";
import {
  createGoogleOAuthClient,
  getGoogleAuthUrl,
  getGoogleUserFromCode,
} from "@repo/services/oauth/google";
import { getGithubAuthUrl, getGithubUserFromCode } from "@repo/services/oauth/github";
import { env } from "../env";

const OAUTH_STATE_COOKIE = "oauth_state";
const TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  sameSite: "strict" as const,
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

type OAuthProvider = "google" | "github";

function getRedirectUri(provider: OAuthProvider) {
  return `${env.BASE_URL}/auth/${provider}/callback`;
}

function redirectWithError(res: Response, message: string) {
  const params = new URLSearchParams({ error: message });
  return res.redirect(`${env.WEB_URL}/signin?${params.toString()}`);
}

function setOAuthState(res: Response, state: string) {
  setCookie(res, OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 10 * 60 * 1000,
  });
}

function validateOAuthState(req: Request, res: Response, state?: string) {
  const expectedState = getCookie(req, OAUTH_STATE_COOKIE);
  clearCookie(res, OAUTH_STATE_COOKIE);

  if (!state || !expectedState || state !== expectedState) {
    redirectWithError(res, "Invalid OAuth state. Please try again.");
    return false;
  }

  return true;
}

async function completeOAuthSignIn(
  res: Response,
  provider: OAuthProvider,
  profile: { providerId: string; email: string; fullName: string },
) {
  const { token } = await userService.signInOrCreateWithOAuth({
    provider,
    providerId: profile.providerId,
    email: profile.email,
    fullName: profile.fullName,
  });

  setCookie(res, "token", token, TOKEN_COOKIE_OPTIONS);
  return res.redirect(`${env.WEB_URL}/dashboard/forms`);
}

export function registerOAuthRoutes(app: Express) {
  app.get("/auth/google", (req, res) => {
    try {
      const state = randomBytes(16).toString("hex");
      const client = createGoogleOAuthClient(getRedirectUri("google"));
      setOAuthState(res, state);
      return res.redirect(getGoogleAuthUrl(client, state));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Google sign-in failed";
      return redirectWithError(res, message);
    }
  });

  app.get("/auth/google/callback", async (req, res) => {
    const { code, state, error } = req.query;

    if (typeof error === "string") {
      return redirectWithError(res, "Google sign-in was cancelled");
    }

    if (typeof code !== "string") {
      return redirectWithError(res, "Missing Google authorization code");
    }

    if (!validateOAuthState(req, res, typeof state === "string" ? state : undefined)) {
      return;
    }

    try {
      const client = createGoogleOAuthClient(getRedirectUri("google"));
      const profile = await getGoogleUserFromCode(client, code);
      return await completeOAuthSignIn(res, "google", profile);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Google sign-in failed";
      return redirectWithError(res, message);
    }
  });

  app.get("/auth/github", (req, res) => {
    try {
      const state = randomBytes(16).toString("hex");
      setOAuthState(res, state);
      return res.redirect(getGithubAuthUrl(state, getRedirectUri("github")));
    } catch (error) {
      const message = error instanceof Error ? error.message : "GitHub sign-in failed";
      return redirectWithError(res, message);
    }
  });

  app.get("/auth/github/callback", async (req, res) => {
    const { code, state, error } = req.query;

    if (typeof error === "string") {
      return redirectWithError(res, "GitHub sign-in was cancelled");
    }

    if (typeof code !== "string") {
      return redirectWithError(res, "Missing GitHub authorization code");
    }

    if (!validateOAuthState(req, res, typeof state === "string" ? state : undefined)) {
      return;
    }

    try {
      const profile = await getGithubUserFromCode(code, getRedirectUri("github"));
      return await completeOAuthSignIn(res, "github", profile);
    } catch (err) {
      const message = err instanceof Error ? err.message : "GitHub sign-in failed";
      return redirectWithError(res, message);
    }
  });
}
