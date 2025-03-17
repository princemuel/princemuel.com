import { createClient } from "@libsql/client";
import { DATABASE_TOKEN, DATABASE_URL } from "astro:env/server";

export const db = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_TOKEN,
});
