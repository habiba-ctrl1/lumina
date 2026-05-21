import React from 'react';

export default function SectionWrapper({ 
  children, 
  className = '',
  id
}: { 
  children: React.ReactNode; 
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`w-full max-w-7xl mx-auto px-4 py-16 md:py-20 lg:py-24 ${className}`}>
      {children}
    </section>
  );
}
