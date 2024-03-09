import React from 'react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { cn } from '../utils/cn';
import { IconBrandGoogle } from '@tabler/icons-react';

export function SignupFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
  };
  return (
    <div className='px-[10px] h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center'>
      <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]'></div>
      <div className='shadow-2xl max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 pb-1 md:p-8 md:pb-1 bg-white dark:bg-black'>
        <h2 className='font-bold text-xl'>Welcome to Aceternity</h2>

        <form
          className='pt-2 pb-4 mt-5 flex flex-col gap-5'
          onSubmit={handleSubmit}
        >
          <div className='flex flex-col'>
            <LabelInputContainer>
              <Label htmlFor='username'>userName</Label>
              <Input id='username' placeholder='Tyler' type='text' />
            </LabelInputContainer>
          </div>
          <div>
            <LabelInputContainer>
              <Label htmlFor='email'>Email Address</Label>
              <Input
                id='email'
                placeholder='projectmayhem@fc.com'
                type='email'
              />
            </LabelInputContainer>
          </div>
          <div>
            <LabelInputContainer>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' placeholder='••••••••' type='password' />
            </LabelInputContainer>
          </div>

          <button
            className='bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
            type='submit'
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className='bg-gradient-to-r from-transparent via-neutral-400 dark:via-neutral-700 to-transparent my-2 h-[1px] w-full' />
          <div className='flex flex-col space-y-4'>
            <button
              className=' relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
              type='submit'
            >
              <IconBrandGoogle className='h-5 w-5 text-neutral-800 dark:text-neutral-300' />
              <span className='text-neutral-700 dark:text-neutral-300 text-md'>
                Google
              </span>
              <BottomGradient />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
      <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex flex-col gap-2 w-full', className)}>
      {children}
    </div>
  );
};
