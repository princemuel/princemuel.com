import { log_in_dev } from "@/helpers/log-in-dev";
import { octokit } from "@/lib/clients";

import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import matter from "gray-matter";
import { RequestError as GhRequestError } from "octokit";

import type { Loader } from "astro/loaders";

import type { z } from "astro:schema";

type LoaderOptions<T> = {
  schema?: T;
  git_config: `owner:${string};repo:${string};branch:${string};directory:${string}`;
  incremental: boolean;
};

type GitConfig = {
  owner: string;
  repo: string;
  branch: string;
  directory: string;
};

export default function gh_loader<
  T extends z.ZodType<unknown, z.ZodTypeDef, unknown>,
>(options: LoaderOptions<T>): Loader {
  const git = Object.fromEntries(
    options.git_config.split(";").map((v) => v.split(":")),
  ) as GitConfig;

  return {
    name: `gh-${git.directory}-loader`,
    schema: options.schema,
    load: async (ctx) => {
      ctx.logger.info(`fetching content from ${git.directory}...`);
      const last_modified = ctx.meta.get("last-modified");

      try {
        // Fetch the content of the git.directory from GitHub
        const req = await octokit.rest.repos.getContent({
          owner: git.owner,
          repo: git.repo,
          ref: git.branch,
          path: `/${git.directory}`,
          headers: { "If-Modified-Since": last_modified ?? "" },
        });

        if (last_modified && req.headers["last-modified"] === last_modified) {
          ctx.logger.info(`No changes found in ${git.directory}`);
          return;
        }

        const updated = new Date(req.headers["last-modified"] ?? new Date());

        ctx.meta.set("last-modified", updated.toISOString());

        if (!Array.isArray(req.data)) {
          ctx.logger.info(
            `This folder '${git.directory}' does not exist in the repo`,
          );
          return;
        }

        const requests = req.data.map(async (file) => {
          const fileName = file.name;
          try {
            const response = await octokit.rest.repos.getContent({
              owner: git.owner,
              repo: git.repo,
              ref: git.branch,
              path: `/${git.directory}/${fileName}`,
            });

            const data = response.data;

            return {
              id: fileName.replace(/\.mdx?$/, ""),
              body:
                "content" in data
                  ? Buffer.from(data.content, "base64").toString("utf-8")
                  : "",
              updatedAt: new Date(response.headers["last-modified"] ?? new Date()),
            };
          } catch (e) {
            if (!(e instanceof GhRequestError)) return null;
            log_in_dev(`Error fetching ${fileName}:`, e);
            return null;
          }
        });

        const response = await Promise.all(requests);

        const entries = response.filter(Boolean);

        ctx.logger.info(`Processing ${entries.length} entries`);
        ctx.store.clear();

        const processor = await createMarkdownProcessor(ctx.config.markdown);

        for (const item of entries) {
          const { data: frontmatter, content } = matter(item.body);
          const parsed = await ctx.parseData({
            id: item.id,
            data: { ...frontmatter, updatedAt: item.updatedAt },
          });

          const { code, metadata } = await processor.render(content);

          ctx.store.set({
            id: item.id,
            data: parsed,
            body: content,
            rendered: {
              html: code,
              metadata: {
                ...metadata,
                frontmatter: {
                  ...metadata.frontmatter,
                  ...frontmatter,
                  updatedAt: item.updatedAt,
                },
              },
            },
            digest: ctx.generateDigest(content),
          });
        }
      } catch (error) {
        ctx.logger.error(`Error loading ${git.directory}`);
        throw error;
      }
    },
  };
}
