import * as React from 'react';
import * as radix from '@radix-ui/react-label';
import { cn } from '../../utils/cn';

const Label = React.forwardRef<
  React.ElementRef<typeof radix.Root>,
  React.ComponentPropsWithoutRef<typeof radix.Root>
>(({ className, ...props }, ref) => (
  <radix.Root
    ref={ref}
    className={cn(
      'font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props}
  />
));
Label.displayName = radix.Root.displayName;

export { Label };
