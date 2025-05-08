import { sequence } from "astro:middleware";

import { botcheck } from "./botcheck";
import { ratelimit } from "./ratelimit";
import { secure_headers } from "./security";

export const onRequest = sequence(secure_headers, botcheck, ratelimit);
