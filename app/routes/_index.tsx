import { envVars } from '@/env.dto.mjs';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  console.log(import.meta.env.VITE_SOME_KEY); // 123
  console.log(import.meta.env.SERVER_URL); // undefined
  console.log(
    typeof window !== 'undefined' && window.env?.REMIX_PUBLIC_SITE_URL
  ); // undefined

  console.log('VERCEL_URL', envVars.VITE_VERCEL_URL);

  return (
    <div>
      <h1 className='text-3xl font-bold underline'>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target='_blank'
            href='https://remix.run/tutorials/blog'
            rel='noreferrer'
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            data-state='open'
            target='_blank'
            href='https://remix.run/tutorials/jokes'
            rel='noreferrer'
            className='data-[state=open]:zoom-in-95'
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target='_blank' href='https://remix.run/docs' rel='noreferrer'>
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
