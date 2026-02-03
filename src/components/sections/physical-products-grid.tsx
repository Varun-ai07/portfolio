import React from 'react';
import Image from 'next/image';

const PhysicalProductsGrid = () => {
  const products = [
    {
      title: 'Radio',
      category: 'Audio device',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/af4c35f8-1446-4f5b-bb80-a08d745daef0-nivora-framer-website/assets/images/qUKerDw7PYRHdjtSo9a8dMyn4-5.webp',
      link: './gallery/radio',
    },
    {
      title: 'Knobs',
      category: 'Hardware',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/af4c35f8-1446-4f5b-bb80-a08d745daef0-nivora-framer-website/assets/images/ECZJ1Q4e4w0kBS44HaG0CXpt4-6.webp', // Using closest match for knobs
      link: './gallery/knobs',
    },
    {
      title: 'Camera',
      category: 'Imaging Device',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/af4c35f8-1446-4f5b-bb80-a08d745daef0-nivora-framer-website/assets/images/ECZJ1Q4e4w0kBS44HaG0CXpt4-6.webp',
      link: './gallery/camera',
    },
    {
      title: 'Floppy',
      category: 'Input Device',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/af4c35f8-1446-4f5b-bb80-a08d745daef0-nivora-framer-website/assets/images/NtEN2D6kMVU5edxcFtgwapyjzY-7.webp',
      link: './gallery/floppy',
    },
    {
      title: 'Wearable',
      category: 'Personal Audio',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/af4c35f8-1446-4f5b-bb80-a08d745daef0-nivora-framer-website/assets/images/fiZDgyyLGVGXBPPrxVokE0CNYf8-8.webp',
      link: './gallery/wearable-device',
    },
    {
      title: 'Controller',
      category: 'Gaming',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/af4c35f8-1446-4f5b-bb80-a08d745daef0-nivora-framer-website/assets/images/uYntMlmBGGuyvzWF4BXrjyJndY-9.webp',
      link: './gallery/controller',
    },
    {
      title: 'Smart Speaker',
      category: 'Home Audio',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/af4c35f8-1446-4f5b-bb80-a08d745daef0-nivora-framer-website/assets/images/C7BSp7QXaRs6vOZA6mQJJw1Afv8-10.webp',
      link: './gallery/smart-speaker',
    },
    {
      title: 'Wristwatch',
      category: 'Hardware',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/af4c35f8-1446-4f5b-bb80-a08d745daef0-nivora-framer-website/assets/images/MmBthxVDgdEVOD8FF0y49WB0kKk-11.webp',
      link: './gallery/wristwatch',
    },
  ];

  return (
    <section className="bg-black py-20 md:py-40" id="gallery">
      <div className="container mx-auto px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-8">
          <div className="flex flex-col gap-4 max-w-[600px]">
            <span className="font-eyebrow text-primary text-[14px] font-medium uppercase tracking-[0.2em]">
              Gallery
            </span>
            <h2 className="text-white text-[ clamp(2rem,6vw,4rem) ] font-bold uppercase tracking-tighter leading-[1.1]">
              Physical Products
            </h2>
          </div>
          <div className="max-w-[420px]">
            <p className="text-[#999999] text-[18px] leading-[1.6]">
              Carefully designed objects focused on form, usability, and manufacturable detail across modern consumer devices.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product, index) => (
            <a
              key={index}
              href={product.link}
              className="group relative flex flex-col gap-4 border border-[#333333] bg-[#0B0B0B] p-0 transition-colors duration-300 hover:border-white"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#111111]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col px-5 pb-6">
                <h4 className="text-white text-[20px] font-bold uppercase tracking-tighter mb-1">
                  {product.title}
                </h4>
                <p className="text-[#999999] text-[14px] font-medium uppercase tracking-wider">
                  {product.category}
                </p>
              </div>

              {/* Viewfinder Corners - Technical borders */}
              <div className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {/* Custom borders/corners reflecting nivora's style */}
                <div className="viewfinder-corner viewfinder-tl !border-white" />
                <div className="viewfinder-corner viewfinder-tr !border-white" />
                <div className="viewfinder-corner viewfinder-bl !border-white" />
                <div className="viewfinder-corner viewfinder-br !border-white" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhysicalProductsGrid;