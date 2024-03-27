import React from 'react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { cn } from '../utils/cn';
import { IconBrandGoogle } from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';
import OAuth from '../components/OAuth';

export function Signup() {
  const { signup } = useSignup();
  const [formData, setFormData] = useState<{
    userName: string;
    email: string;
    password: string;
  }>({
    userName: '',
    email: '',
    password: '',
  });
  const { userName, email, password } = formData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup('http://localhost:4100/api/auth/signup', formData);
    setFormData({ userName: '', email: '', password: '' });
  };

  return (
    <div className='px-[10px]'>
      <div className='mt-[100px] shadow-2xl max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 pb-1 md:p-8 md:pb-1 bg-white dark:bg-black'>
        <h2 className='font-bold text-xl'>
          Welcome to File <span className='text-blue-500'>Vault</span>
        </h2>

        <form
          className='pt-2 pb-4 mt-5 flex flex-col gap-5'
          onSubmit={handleSubmit}
        >
          <div className='flex flex-col'>
            <LabelInputContainer>
              <Label htmlFor='userName'>userName</Label>
              <Input
                onChange={handleInputChange}
                id='userName'
                placeholder='Tyler'
                type='text'
                value={userName}
              />
            </LabelInputContainer>
          </div>
          <div>
            <LabelInputContainer>
              <Label htmlFor='email'>Email Address</Label>
              <Input
                onChange={handleInputChange}
                id='email'
                placeholder='projectmayhem@fc.com'
                type='email'
                value={email}
              />
            </LabelInputContainer>
          </div>
          <div>
            <LabelInputContainer>
              <Label htmlFor='password'>Password</Label>
              <Input
                onChange={handleInputChange}
                id='password'
                placeholder='••••••••'
                type='password'
                value={password}
              />
            </LabelInputContainer>
          </div>

          <p>
            Have an account?{' '}
            <Link to='/login' className='font-semibold text-blue-500'>
              Log in
            </Link>
          </p>

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
              type='button'
            >
              <IconBrandGoogle className='h-5 w-5 text-neutral-800 dark:text-neutral-300' />
              <span className='text-neutral-700 dark:text-neutral-300 text-md'>
                <OAuth />
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
