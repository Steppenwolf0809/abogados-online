import React from 'react';

interface WatermarkProps {
  text?: string;
}

export default function Watermark({ text = "www.abogadosonlineecuador.com" }: WatermarkProps) {
  return (
    <div className="absolute inset-0 grid gap-8 opacity-[0.06] pointer-events-none select-none -z-10"
         style={{
           gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
           transform: 'rotate(-45deg)',
           transformOrigin: 'center',
           marginTop: '-25%',
           marginLeft: '-25%',
           width: '150%',
           height: '150%'
         }}>
      {Array(20).fill(text).map((text, i) => (
        <div key={i} className="text-xl md:text-2xl font-bold text-gray-800 whitespace-nowrap text-center tracking-widest">
          {text}
        </div>
      ))}
    </div>
  );
}
