import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import LottiePlayer from './ui/LottiePlayer';
import { ArrowDownRight, ArrowRight, Sparkles, PhoneCall } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import earthAnimation from '../src/assets/lottie/earth.json';

const Hero: React.FC = () => {
  return (
    <section id="Home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      
      <div className="container mx-auto px-4 md:px-6 mt-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="max-w-2xl relative z-10">
            
            <div className="mb-8 mt-4">
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                  className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight text-brand-black"
                >
                  Less Work,
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                  className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight"
                >
                  <span className="text-blue-600">More Growth</span> With AI
                </motion.h1>
              </div>
            </div>

            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
                Our premier partner for comprehensive AI automation services. We deliver tailored, end-to-end AI workflow optimization, intelligent process automation integration, and data-driven solutions across all business verticals to scale your operations.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a 
                  href="tel:098884632"
                  className="group inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 hover:scale-105 transition-all shadow-lg"
                >
                  <PhoneCall size={18} className="animate-pulse" />
                  <div className="flex flex-col text-left">
                    <span className="font-semibold leading-tight">Talk to AI Assistant</span>
                    <span className="text-sm text-blue-100 font-normal leading-tight">Call 09 888 4632</span>
                  </div>
                </a>
                <div className="text-sm text-gray-500 font-medium">
                  to book your free appointment<br/>and get started
                </div>
              </div>
            </Reveal>

          </div>

          {/* Right Content - Earth Lottie */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center">
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1, delay: 0.4 }}
               className="w-full h-full"
             >
                <LottiePlayer 
                  animationData={earthAnimation} 
                  className="w-full h-full"
                />
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;