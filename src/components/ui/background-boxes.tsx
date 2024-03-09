import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        'absolute left-1/4 p-4 -top-1/4 flex  -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 ',
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row${i}`}
          className='w-16 h-8 border-l border-slate-700 relative'
        >
          {cols.map((_, j) => (
            <motion.div
              key={`col${j}`}
              className='w-16 h-8 border-r border-t border-slate-700 relative'
              whileHover={{ backgroundColor: 'white' }} // Change background color to white on hover
              initial={{ backgroundColor: 'black' }} // Set initial background color to black
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700 stroke-[1px] pointer-events-none'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 6v12m6-6H6'
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
