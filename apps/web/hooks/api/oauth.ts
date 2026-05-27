import { getApiBaseUrl } from "~/lib/api-base-url";

export function useOAuthSignIn() {
  const apiBaseUrl = getApiBaseUrl();

  const signInWithGoogle = () => {
    window.location.href = `${apiBaseUrl}/auth/google`;
  };

  const signInWithGithub = () => {
    window.location.href = `${apiBaseUrl}/auth/github`;
  };

  return {
    signInWithGoogle,
    signInWithGithub,
  };
}
