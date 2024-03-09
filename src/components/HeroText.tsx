'use client';
import { TypewriterEffectSmooth } from '../components/ui/typewriter-effect';
export function HeroText() {
  const words = [
    {
      text: 'Tech',
    },
    {
      text: 'Trade',
    },
    {
      text: 'Hub',
      className: 'text-blue-500 dark:text-blue-500',
    },
  ];
  return (
    <div className='py-5 max-w-5xl flex flex-col items-center font-semibold '>
      <TypewriterEffectSmooth words={words} />
      <p className='-mt-6 sm:-mt-4 text-center text-xl sm:text-3xl xl:text-5xl px-1'>
        Upgrade your tech, downgrade your costs, find your perfect match today!
      </p>
    </div>
  );
}
