import { DATABASE_TOKEN, DATABASE_URL } from "astro:env/server";

import { createClient } from "@libsql/client";

import { remember } from "@/utils/object";

export const db = remember("__db__", () =>
  createClient({
    url: DATABASE_URL,
    authToken: DATABASE_TOKEN,
  }),
);
