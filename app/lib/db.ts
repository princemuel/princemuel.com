import { createClient } from "@libsql/client";
import { DATABASE_ENCRYPTION_KEY, DATABASE_TOKEN, DATABASE_URL } from "astro:env/server";

export const db = createClient({
  url: "file:../../db/local.db",
  syncUrl: DATABASE_URL,
  syncInterval: 5 * 60,
  authToken: DATABASE_TOKEN,
  encryptionKey: DATABASE_ENCRYPTION_KEY,
});
