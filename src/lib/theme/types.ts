import { z } from "zod";

export const Theme = {
  DARK: "dark",
  LIGHT: "light",
  SYSTEM: "system",
} as const;
export const themeSchema = z.nativeEnum(Theme);
export type Theme = z.infer<typeof themeSchema>;
