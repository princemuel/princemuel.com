import * as React from 'react';
import { BreakpointIndicator } from '../atoms';
import { LayoutFooter, LayoutHeader } from '../organisms';

type Props = {
  children: React.ReactNode;
};
function BaseLayout({ children }: Props) {
  return (
    <React.Fragment>
      <LayoutHeader />
      <>{children}</>
      <LayoutFooter />
      <BreakpointIndicator />
    </React.Fragment>
  );
}

export { BaseLayout };
