import { handleApi } from "../../helpers/handle-api";

export const GET = handleApi(async () => {
  const result = {
    subject: "acct:princemuel@mastodon.social",
    aliases: [
      "https://mastodon.social/@princemuel",
      "https://mastodon.social/users/princemuel",
    ],
    links: [
      {
        rel: "http://webfinger.net/rel/profile-page",
        type: "text/html",
        href: "https://mastodon.social/@princemuel",
      },
      {
        rel: "self",
        type: "application/activity+json",
        href: "https://mastodon.social/users/princemuel",
      },
      {
        rel: "http://ostatus.org/schema/1.0/subscribe",
        template: "https://mastodon.social/authorize_interaction?uri={uri}",
      },
    ],
  };

  return Response.json(result, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
});
