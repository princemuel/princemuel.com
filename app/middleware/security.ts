import type { MiddlewareHandler } from "astro";

export const secure_headers: MiddlewareHandler = async ({ request }, next) => {
  const response = await next();
  const result = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: new Headers(response.headers),
  });

  result.headers.set("X-Content-Type-Options", "nosniff");
  result.headers.set("X-Frame-Options", "DENY");
  result.headers.set("X-XSS-Protection", "1; mode=block");
  result.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  result.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  // HSTS (consider removing if Netlify enforces it)
  if (request.url.startsWith("https:")) {
    result.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }

  return result;
};
