import { handleApi } from "@/helpers/handle-api";

export const GET = handleApi(async (ctx) => {
  const text = `
  <OpenSearchDescription
    xmlns="http://a9.com/-/spec/opensearch/1.1/"
    xmlns:moz="http://www.mozilla.org/2006/browser/search/"
  >
    <ShortName>Prince Muel</ShortName>
    <Description>Search ${ctx.site}</Description>
    <InputEncoding>UTF-8</InputEncoding>
    <Url method="get"
      type="text/html"
      template="https://www.google.com/search?q={searchTerms}+site%3A${ctx.site}"
    />
  </OpenSearchDescription>
`;

  return new Response(text, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
});
