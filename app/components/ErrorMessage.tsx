import React, { PropsWithChildren, ReactNode } from 'react'
import { Text } from '@radix-ui/themes';

const ErrorMessage: React.FC<{ message: ReactNode }> = ({ children } : PropsWithChildren<{ message: ReactNode }>) => {
  if (!children) return null;
  return (
    <Text color="red" as="p">
      {children}
    </Text>
  )
}

export default ErrorMessage
