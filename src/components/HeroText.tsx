import { heroText } from '../constants';

import { TypewriterEffectSmooth } from '../components/ui/typewriter-effect';
export function HeroText() {
  return (
    <div className='hero__textContainer'>
      <TypewriterEffectSmooth words={heroText} />
      <p className='hero__textTagline'>
        Secure, Organize, and Access Your Files with File Vault. Your Ultimate
        Digital Repository!
      </p>
    </div>
  );
}
