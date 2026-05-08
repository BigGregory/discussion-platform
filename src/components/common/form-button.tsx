'use client';

import { PropsWithChildren } from 'react';
import { Button } from '@nextui-org/react';

interface FormButtonProps {
  isLoading: boolean;
}

export default function FormButton({
  children,
  isLoading,
}: PropsWithChildren<FormButtonProps>) {
  return (
    <Button type='submit' isLoading={isLoading}>
      {children}
    </Button>
  );
}
