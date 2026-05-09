const fs = require('fs');
const path = require('path');

const pageName = process.argv[2];

if (!pageName) {
  console.log('Usage: node scripts/scaffold.js <page-name>');
  process.exit(1);
}

const dirPath = path.join(__dirname, '../src/app', pageName);
const filePath = path.join(dirPath, 'page.tsx');

if (fs.existsSync(dirPath)) {
  console.log(`Page "${pageName}" already exists.`);
  process.exit(1);
}

fs.mkdirSync(dirPath, { recursive: true });

const template = `"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page() {
  return (
    <div className="min-h-screen bg-charcoal-950 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="text-gold-500" size={24} />
            <span className="text-gold-500 uppercase tracking-[0.4em] text-xs font-black">Saudi Event Management Luxury</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-sans font-black text-white mb-8 tracking-tighter capitalize">
            ${pageName.replace(/-/g, ' ')}
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Experience the pinnacle of luxury with our bespoke ${pageName.replace(/-/g, ' ')} services. 
            Every detail meticulously crafted for an unforgettable experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[3rem] p-12 shadow-3xl">
            <h2 className="text-2xl font-black text-white mb-6 tracking-tight">Our Philosophy</h2>
            <p className="text-gray-400 leading-relaxed font-medium">
              At Saudi Event Management, we believe that true luxury lies in the details. Our approach to ${pageName.replace(/-/g, ' ')} 
              is built on a foundation of precision, creativity, and unparalleled service.
            </p>
          </div>
          <div className="bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[3rem] p-12 shadow-3xl">
            <h2 className="text-2xl font-black text-white mb-6 tracking-tight">Bespoke Excellence</h2>
            <p className="text-gray-400 leading-relaxed font-medium">
              Each event is a unique canvas. We work closely with our elite clientele to ensure that every 
              element of their ${pageName.replace(/-/g, ' ')} reflects their personal style and vision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(filePath, template);
console.log(`Successfully created luxury page: src/app/${pageName}/page.tsx`);
