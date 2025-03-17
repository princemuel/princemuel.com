import * as Sentry from "@sentry/astro";
import * as Spotlight from "@spotlightjs/spotlight";

Sentry.init({
  dsn: "https://6b6896649eefeae398f66bd56d9d879e@o4505133438533632.ingest.us.sentry.io/4508977534009344",
  integrations: [],
});
Spotlight.init();
