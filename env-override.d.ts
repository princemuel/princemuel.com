interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string;
  readonly SESSION_TOKEN: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element;
  export const frontmatter: any;
  export default MDXComponent;
}
