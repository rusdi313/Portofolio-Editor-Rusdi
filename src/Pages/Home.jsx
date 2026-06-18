import React from "react";
import TextStagger from "../components/TextStagger";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div id="Home" className="relative w-full min-h-screen bg-[#000000] text-white overflow-hidden flex flex-col selection:bg-white selection:text-black">
      
      {/* Background Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Subtle noise texture or radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(50,50,50,0.4)_0%,_rgba(0,0,0,1)_70%)]"></div>
      </div>

      {/* Swiss Grid Overlay - Minimalist */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-0 bottom-0 left-6 md:left-12 border-l border-white/[0.05]"></div>
        <div className="absolute top-0 bottom-0 right-6 md:right-12 border-r border-white/[0.05]"></div>
        <div className="absolute top-1/2 left-0 w-full border-t border-white/[0.03]"></div>
        
        {/* Crosshairs */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 text-white/20 text-xs font-light">+</div>
        <div className="absolute top-3/4 left-3/4 -translate-x-1/2 text-white/20 text-xs font-light">+</div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 px-6 md:px-12 w-full max-w-[1600px] mx-auto flex flex-col h-full flex-grow pt-32 pb-12">
        
        {/* Top Header Section inside Home */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full mb-auto mt-12">
          <div className="max-w-2xl">
            <TextStagger 
              text="Premium visual storytelling and cinematic experiences for modern brands."
              delay={0.03}
              duration={0.8}
              color="#ffffff"
              className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.1] mb-8"
              trigger="animate"
            />
          </div>
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1, duration: 0.8 }}
             className="flex flex-col items-start md:items-end space-y-2 text-xs font-bold uppercase tracking-widest text-white/50"
          >
             <span>Based in Jakarta</span>
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span> Available for work</span>
          </motion.div>
        </div>

        {/* Huge Bottom Typography */}
        <div className="w-full flex justify-between items-end mt-24 relative">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="hidden md:flex flex-col space-y-2 text-xs uppercase tracking-widest font-medium text-white/40 mb-4"
          >
            <span>Scroll to explore</span>
            <div className="w-[1px] h-12 bg-white/40 mt-4 origin-top animate-pulse"></div>
          </motion.div>

          <motion.h1 
             initial={{ opacity: 0, y: 100, rotate: 2 }}
             animate={{ opacity: 1, y: 0, rotate: 0 }}
             transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
             className="text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-black tracking-tighter leading-[0.8] select-none text-transparent ml-auto origin-bottom"
             style={{ WebkitTextStroke: "2px rgba(255,255,255,0.9)" }}
          >
             RUSDI
          </motion.h1>
          
        </div>
      </div>
    </div>
  );
};

export default Home;