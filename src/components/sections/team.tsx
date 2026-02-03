import React from 'react';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'LIAM',
    role: 'Product Designer',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/af4c35f8-1446-4f5b-bb80-a08d745daef0-nivora-framer-website/assets/images/CJx6vuv3UJI2IyPXZcvkIcsONY-12.jpg',
    offset: 'md:translate-y-[-120px] md:translate-x-[-15%]',
  },
  {
    name: 'NOAH',
    role: 'Framer Developer',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/af4c35f8-1446-4f5b-bb80-a08d745daef0-nivora-framer-website/assets/images/mAUBdwW3ZNLoTwM0Qgc7nzyFYsU-24.webp',
    offset: 'md:translate-y-[-120px] md:translate-x-[15%]',
  },
  {
    name: 'MORGAN',
    role: 'Creative Director',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/af4c35f8-1446-4f5b-bb80-a08d745daef0-nivora-framer-website/assets/images/ueDmcBYocjsloR3rQA3UY7NtQ0c-13.jpg',
    offset: 'md:translate-y-[0px] md:translate-x-[-5%]',
  },
  {
    name: 'SOFIA',
    role: 'Lead Designer',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/af4c35f8-1446-4f5b-bb80-a08d745daef0-nivora-framer-website/assets/images/dA7huQOzkQvvkX9G3UCmOainQ8-23.webp',
    offset: 'md:translate-y-[0px] md:translate-x-[5%]',
  },
  {
    name: 'OLIVIA',
    role: 'Project Manager',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/af4c35f8-1446-4f5b-bb80-a08d745daef0-nivora-framer-website/assets/images/ke9CeY7i1PDUXLQ3ZM8CJczVmJc-22.webp',
    offset: 'md:translate-y-[120px] md:translate-x-[20%]',
  },
  {
    name: 'ETHAN',
    role: 'Design Engineer',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/af4c35f8-1446-4f5b-bb80-a08d745daef0-nivora-framer-website/assets/images/PdQPVs4R7CP1zXb7Qk646wxYFw-14.jpg',
    offset: 'md:translate-y-[120px] md:translate-x-[-20%]',
  },
];

const ViewfinderCorners = () => (
  <>
    <div className="viewfinder-corner viewfinder-tl border-[#FFFFFF] opacity-60" style={{ width: '12px', height: '12px' }} />
    <div className="viewfinder-corner viewfinder-tr border-[#FFFFFF] opacity-60" style={{ width: '12px', height: '12px' }} />
    <div className="viewfinder-corner viewfinder-bl border-[#FFFFFF] opacity-60" style={{ width: '12px', height: '12px' }} />
    <div className="viewfinder-corner viewfinder-br border-[#FFFFFF] opacity-60" style={{ width: '12px', height: '12px' }} />
  </>
);

const CardLabel = ({ name, role, align = 'left' }: { name: string, role: string, align?: 'left' | 'right' }) => (
  <div className={`mt-4 absolute ${align === 'left' ? 'left-[-1px] text-left' : 'right-[-1px] text-right'} top-full`}>
    <h5 className="text-[12px] font-bold tracking-widest text-white uppercase">{name}</h5>
    <p className="text-[11px] text-[#999999] tracking-wider mt-0.5">{role}</p>
  </div>
);

const TeamMemberCard = ({ member }: { member: typeof teamMembers[0] }) => {
  const isRight = member.name === 'NOAH' || member.name === 'SOFIA' || member.name === 'OLIVIA';
  
  return (
    <div className={`relative group w-full max-w-[280px] mx-auto ${member.offset}`}>
      <div className="relative aspect-[3/4] overflow-hidden bg-[#0F0F0F]">
        <ViewfinderCorners />
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <CardLabel name={member.name} role={member.role} align={isRight ? 'right' : 'left'} />
    </div>
  );
};

export default function TeamSection() {
  return (
    <section className="bg-black py-[200px] overflow-hidden" id="team">
      <div className="container relative">
        {/* Section Header */}
        <div className="mb-40 flex flex-col items-center text-center">
          <span className="font-eyebrow mb-6">Our Team</span>
          <h2 className="text-white max-w-[800px] leading-[0.9] text-center">
            Creative Minds
          </h2>
        </div>

        {/* Staggered Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-64 md:gap-y-[240px] px-4 md:px-20 relative">
          {/* Liam - Top Left Area */}
          <div className="flex justify-center md:col-start-1">
            <TeamMemberCard member={teamMembers[0]} />
          </div>

          {/* Noah - Top Right Area */}
          <div className="flex justify-center md:col-start-3">
            <TeamMemberCard member={teamMembers[1]} />
          </div>

          {/* Morgan - Center Area */}
          <div className="flex justify-center md:col-start-1 md:mt-20">
            <TeamMemberCard member={teamMembers[2]} />
          </div>

          {/* Sofia - Center Area */}
          <div className="flex justify-center md:col-start-2 md:mt-20">
            <TeamMemberCard member={teamMembers[3]} />
          </div>

          {/* Ethan - Lower Area */}
          <div className="flex justify-center md:col-start-1 md:mt-40">
            <TeamMemberCard member={teamMembers[5]} />
          </div>

          {/* Olivia - Lower Area */}
          <div className="flex justify-center md:col-start-3 md:mt-40">
            <TeamMemberCard member={teamMembers[4]} />
          </div>
        </div>
      </div>
    </section>
  );
}