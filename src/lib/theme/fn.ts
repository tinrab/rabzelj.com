import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie, setHeader } from "@tanstack/react-start/server";
import { z } from "zod";

import { THEME_COOKIE_NAME } from "~/lib/theme/constants";
import { Theme, themeSchema } from "~/lib/theme/types";

export const changeThemeServerFn = createServerFn({ method: "POST" })
  .validator(z.object({ theme: themeSchema }))
  .handler(async ({ data }) => {
    setCookie(THEME_COOKIE_NAME, data.theme, {
      httpOnly: false,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365,
    });
  });

export const getThemeServerFn = createServerFn().handler(async () => {
  const theme = getCookie(THEME_COOKIE_NAME) || Theme.SYSTEM;
  setHeader("cache-control", "private, max-age=31536000");
  return theme as Theme;
});
