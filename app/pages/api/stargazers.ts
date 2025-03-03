import { OCTOKIT_USERNAME } from "astro:env/server";

import { handler } from "@/helpers/api-handler";
import { RequestError, get_code_from_status } from "@/helpers/request-error";
import { octokit } from "@/lib/clients";

import { RequestError as GithubError } from "octokit";

export const prerender = false;

export const GET = handler(async () => {
  try {
    const response = await octokit.rest.repos.get({
      owner: OCTOKIT_USERNAME,
      repo: "princemuel.com",
    });
    return Response.json(
      { payload: response.data.stargazers_count },
      { status: 200 },
    );
  } catch (error) {
    if (!(error instanceof GithubError)) throw error;
    throw new RequestError(
      get_code_from_status(error.status),
      error.message,
      new Error(error.message, { cause: error.cause }),
    );
  }
});
