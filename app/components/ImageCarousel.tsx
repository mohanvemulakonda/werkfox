'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = [
  { src: '/thermal-printer.png', alt: 'Thermal Printer', label: 'PRINTERS', hasImage: true },
  { src: '/label-rolls-clean.png', alt: 'Premium Custom Labels', label: 'LABELS', hasImage: true },
  { src: '/thermal-ribbons.png', alt: 'Thermal Ribbons', label: 'RIBBONS', hasImage: true },
];

export default function ImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % 3);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full">
      <style jsx global>{`
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        .active-card {
          animation: pulse-scale 3s ease-in-out;
          z-index: 10;
        }
      `}</style>

      {/* Printer Image - Top Left, 55% width */}
      <div className="absolute top-0 left-0 w-[55%] h-[45%]">
        <div className={`relative rounded-2xl bg-white shadow-xl overflow-hidden transition-all duration-700 h-full ${activeIndex === 0 ? 'active-card shadow-2xl' : ''}`}>
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <Image
              src={images[0].src}
              alt={images[0].alt}
              width={300}
              height={300}
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <p className="text-white font-bold text-sm font-open-sans">{images[0].label}</p>
          </div>
        </div>
      </div>

      {/* Ribbons Image - Top Right (offset), 42% width */}
      <div className="absolute top-[15%] right-0 w-[42%] h-[50%]">
        <div className={`relative rounded-2xl bg-white shadow-xl overflow-hidden transition-all duration-700 h-full ${activeIndex === 2 ? 'active-card shadow-2xl' : ''}`}>
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <Image
              src={images[2].src}
              alt={images[2].alt}
              width={300}
              height={300}
              className="w-full h-auto object-contain scale-150"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <p className="text-white font-bold text-sm font-open-sans">{images[2].label}</p>
          </div>
        </div>
      </div>

      {/* Labels Image - Bottom Left (offset), 48% width */}
      <div className="absolute bottom-0 left-[8%] w-[48%] h-[42%]">
        <div className={`relative rounded-2xl bg-white shadow-xl overflow-hidden transition-all duration-700 h-full ${activeIndex === 1 ? 'active-card shadow-2xl' : ''}`}>
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <Image
              src={images[1].src}
              alt={images[1].alt}
              width={300}
              height={300}
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <p className="text-white font-bold text-sm font-open-sans">{images[1].label}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
