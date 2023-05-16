interface IUser {
  name: string;
}

type ExtractElementProps<T> = T extends React.ComponentType<infer Props>
  ? Props extends object
    ? Props
    : never
  : never;

type $ElementProps<E extends React.ElementType<any>> = {
  children: React.ReactNode;
  as?: E;
};

type ElementProps<E extends React.ElementType<any>> = $ElementProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof $ElementProps<E>>;

interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {}