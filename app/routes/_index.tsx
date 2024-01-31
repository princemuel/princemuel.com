import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/remix';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Home | Drip With Pryde' },
    {
      name: 'description',
      content: 'Drip With Pryde is an online ecommerce store serving',
    },
  ];
};

// export const loader: LoaderFunction = async (args) => {
//   const { userId } = await getAuth(args);
//   if (!userId) {
//     return redirect('/sign-in');
//   }
//   return {};
// };

export default function Index() {
  return (
    <div>
      <SignedIn>
        <h1>Index route</h1>
        <p>You are signed in!</p>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
