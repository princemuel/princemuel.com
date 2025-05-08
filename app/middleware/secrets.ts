import { println$ } from "@/helpers/println";

import type { MiddlewareHandler } from "astro";

export const authenticate: MiddlewareHandler = async ({ request }, next) => {
  if (!request.url.includes("/api/")) return next();

  try {
    return next();
  } catch (error) {
    println$(error);
    return next();
  }
};

// export const apiCheck: MiddlewareHandler = async ({ request, locals }, next) => {

//   // Initialize API context in locals
//   locals.auth = {
//     startTime: Date.now(),
//   };

//   // Validate API key if required
//   const apiKey = request.headers.get("x-api-key");
//   if (request.url.includes('/api/protected')) {
//     if (!apiKey || !validateApiKey(apiKey)) {
//       return new Response('Invalid or missing API key', { status: 401 });
//     }

//     // Store API key info
//     locals.api.keyInfo = {
//       valid: true,
//       // Additional key info if needed
//     };
//   }

//   // Process the request
//   const response = await next();

//   // Calculate request processing time
//   const processingTime = Date.now() - locals.api.startTime;

//   // Add API metrics headers
//   const newResponse = new Response(response.body, response);
//   newResponse.headers.set('X-Response-Time', `${processingTime}ms`);

//   return newResponse;
// };
