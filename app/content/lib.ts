import { compileMDX } from 'next-mdx-remote/rsc';
import { cache } from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib';
import rehypeHighlight from 'rehype-highlight/lib';
import rehypeSlug from 'rehype-slug';
import 'server-only';
import type { RepoFiletree, ResourceType } from './constants';
import { CONTENT_REPO_PATH } from './constants';
import { components } from './mdx';

export const fetchResourceMeta = cache(
  async (resource: ResourceType, callback?: Callback<ResourceMeta>) => {
    const slugs = await fetchAllSlugs(resource);
    const metadata: ResourceMeta[] = [];

    const promises = await Promise.allSettled(
      (slugs || []).map(async (slug) => {
        const data = await fetchResource(resource)(slug);
        if (!data) return null;
        return await parse_mdx(data, slug);
      })
    );

    for (const promise of promises) {
      if (promise.status === 'fulfilled' && promise?.value != null) {
        if (callback) callback(promise?.value?.meta);
        else metadata.push(promise?.value?.meta);
      }
    }

    return metadata.sort((a, b) => (a.date < b.date ? 1 : -1));
  }
);

export const fetchResource = cache((resource: ResourceType) =>
  cache(async (slug: string) => {
    const url = `https://raw.githubusercontent.com/${CONTENT_REPO_PATH}/main/${resource}/${slug}`;

    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    if (!response.ok) return null;

    const content = await response.text();
    if (content === '404: Not Found') return null;

    return content;
  })
);

export const parse_mdx = async <T extends Resource>(
  data: string,
  slug: string
): Promise<T> => {
  const result = await compileMDX<ResourceMeta>({
    source: data,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
            },
          ],
        ],
      },
    },
  });

  return {
    meta: {
      ...result?.frontmatter,
      id: slug.replace(/\.mdx?$/, ''),
    },
    content: result?.content,
  } as T;
};

export const fetchAllSlugs = cache(async (resource: ResourceType) => {
  const filetrees = await getRepoFiletree();
  if (!filetrees) return null;

  const path_regex = new RegExp(`${resource}/`);

  return filetrees.tree
    .map((obj) => obj.path)
    .filter((path) => {
      return path.includes(resource) && path.endsWith('.mdx');
    })
    .map((path) => path.replace(path_regex, ''));
});

export async function getRepoFiletree() {
  const response = await fetch(
    `https://api.github.com/repos/${CONTENT_REPO_PATH}/git/trees/main?recursive=1`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  );
  if (!response.ok) return null;

  return (await response.json()) as RepoFiletree;
}