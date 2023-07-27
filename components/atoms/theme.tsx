'use client';

import { cn } from '@/lib';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Laptop2, MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { startTransition, useCallback } from 'react';

interface Props {
  className?: string;
}

const options = [
  {
    value: 'light',
    label: 'Light theme',
    icon: Sun,
  },
  {
    value: 'system',
    label: 'System theme',
    icon: Laptop2,
  },
  {
    value: 'dark',
    label: 'Dark theme',
    icon: MoonStar,
  },
];

export const ThemeSwitch = ({ className }: Props) => {
  const { theme, setTheme } = useTheme();

  // const [_, setMounted] = useState(false);
  // useEffect(() => setMounted(true), []);

  const updateTheme = useCallback(
    (theme: string) => startTransition(() => setTheme(theme)),
    [setTheme]
  );

  return (
    <ToggleGroup.Root
      id='theme-switch'
      type='single'
      aria-label='Theme Mode Switch'
      className={cn('flex items-center gap-3 p-1', className)}
      value={theme}
      onValueChange={(value) => {
        if (value) updateTheme(value);
      }}
    >
      {options.map(({ value, label, icon: Icon }) => (
        <ToggleGroup.Item
          key={value}
          value={value}
          aria-label={label}
          className={cn('')}
        >
          <Icon strokeWidth={1} />
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
};
