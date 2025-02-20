import React from 'react';

const Watermark = ({ text = 'www.abogadosonlineecuador.com', size = 'large' }) => {
  const sizeClasses = {
    small: {
      grid: 'gap-4',
      fontSize: 'text-sm',
      columns: 'minmax(150px, 1fr)',
      count: 40
    },
    medium: {
      grid: 'gap-6',
      fontSize: 'text-lg md:text-xl',
      columns: 'minmax(200px, 1fr)',
      count: 30
    },
    large: {
      grid: 'gap-8',
      fontSize: 'text-xl md:text-2xl',
      columns: 'minmax(300px, 1fr)',
      count: 20
    }
  };

  const { grid, fontSize, columns, count } = sizeClasses[size];

  return (
    <div 
      className={`absolute inset-0 ${grid} opacity-[0.04] pointer-events-none select-none z-0 print:opacity-[0.12] print:!block`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, ${columns})`,
        transform: 'rotate(-45deg)',
        transformOrigin: 'center',
        marginTop: '-25%',
        marginLeft: '-25%',
        width: '150%',
        height: '150%'
      }}
    >
      {Array(count).fill(text).map((item, i) => (
        <div 
          key={i} 
          className={`${fontSize} font-bold text-gray-800 whitespace-nowrap text-center tracking-widest print:!text-black`}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Watermark;
