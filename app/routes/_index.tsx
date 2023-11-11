import type { MetaFunction } from '@vercel/remix';

export const meta: MetaFunction = () => {
  return [
    { title: 'Home | Drip With Pryde' },
    {
      name: 'description',
      content: 'Drip With Pryde is an online ecommerce store serving',
    },
  ];
};

export default function Index() {
  return (
    <div className='font-sans leading-relaxed'>
      <h1 className='text-2xl font-medium'>
        <span className='text-black'>Welcome to the</span>&nbsp;
        <span className='text-yellow-400'>Drip With Pryde</span>&nbsp;
        <span className='text-black'>Ecommerce Store</span>
      </h1>
    </div>
  );
}
