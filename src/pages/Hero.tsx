import { HeroText } from '../components/HeroText';

const Hero = () => {
  return (
    <div className='h-full w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center'>
      <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>
      <p className='text-5xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-br from-neutral-400 to-neutral-700'>
        <HeroText />
      </p>
    </div>
  );
};

export default Hero;
