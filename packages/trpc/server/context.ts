import type { CookieOptions } from "express";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import {
  setCookie as setCookieUtils,
  getCookie as getCookieUtils,
  clearCookie as clearCookieUtils,
} from "./utils/cookie";

export interface TRPCContextUser {
  id: string;
}

export interface TRPCContext {
  setCookie: (name: string, value: string, options: CookieOptions) => void;
  getCookie: (name: string) => string | undefined;
  clearCookie: (name: string) => void;
  user?: TRPCContextUser;
}

export async function createContext({ req, res }: CreateExpressContextOptions) {
  const ctx: TRPCContext = {
    setCookie(name: string, value: string, options: CookieOptions) {
      return setCookieUtils(res, name, value, options);
    },
    getCookie(name: string) {
      return getCookieUtils(req, name);
    },
    clearCookie(name: string) {
      return clearCookieUtils(res, name);
    },
    user: undefined,
  };
  return ctx;
}
export type Context = Awaited<ReturnType<typeof createContext>>;
