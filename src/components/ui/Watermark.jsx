import React from 'react';

const Watermark = ({ text = 'www.abogadosonlineecuador.com' }) => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* Marca de agua central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="transform rotate-45 text-6xl font-bold text-gray-800 opacity-[0.04] print:opacity-[0.12] print:!text-black">
          {text}
        </div>
      </div>

      {/* Marca de agua repetida */}
      <div 
        className="absolute inset-0 grid gap-8 opacity-[0.04] print:opacity-[0.12]"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          transform: 'rotate(-45deg)',
          transformOrigin: 'center',
          marginTop: '-25%',
          marginLeft: '-25%',
          width: '150%',
          height: '150%'
        }}
      >
        {Array(20).fill(text).map((item, i) => (
          <div 
            key={i} 
            className="text-xl md:text-2xl font-bold text-gray-800 whitespace-nowrap text-center tracking-widest print:!text-black"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watermark;
