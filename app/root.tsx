import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import './globals.css';
import { json } from '@remix-run/node';
import type { LinksFunction } from '@remix-run/node';

export async function loader() {
  console.log('SERVER_URL', process.env.SERVER_URL);

  return json({
    ENV: {
      REMIX_PUBLIC_SITE_URL: process.env.SERVER_URL,
    },
  });
}

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'use-credentials',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@400;700&display=swap',
  },
];

function App() {
  const data = useLoaderData<typeof loader>();

  console.log(data);

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>

      <body>
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}

export default App;
