'use client';

import { NextUIProvider } from '@nextui-org/react';
import { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
}
