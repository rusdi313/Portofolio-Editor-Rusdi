import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Scroll animation variants requested by user
const rowVariants = {
  hidden: { opacity: 0, y: 150, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 60, damping: 20, mass: 1 }
  }
};

const Portofolio = () => {
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: projData } = await supabase.from("projects").select("*");
        if (projData) setProjects(projData);

        const { data: certData } = await supabase.from("certificates").select("*");
        if (certData) setCertificates(certData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const allItems = [...projects, ...certificates];

  return (
    <div id="Portofolio" className="w-full bg-[#000000] text-white pt-24 pb-32 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-16 md:mb-32">
          <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-white">02 &mdash; Work</span>
          <span className="text-xs md:text-sm font-medium text-white/50 tracking-widest uppercase">Selected Projects</span>
        </div>

        <div className="mt-16 flex flex-col gap-32 md:gap-48">
          {allItems.length === 0 ? (
             <div className="text-white/50 text-sm tracking-widest uppercase font-bold w-full text-center py-24">
               Loading Projects...
             </div>
          ) : (
             allItems.map((item, index) => {
               const isVideo = 'video_url' in item;
               const year = "2024";

               return (
                  <motion.div
                    key={item.id || index}
                    variants={rowVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="group cursor-pointer flex flex-col w-full relative"
                    onClick={() => navigate(`/project/${item.id}`)}
                  >
                    {/* Meta details with HUGE Typography (Fuel Style) */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 z-10 relative">
                       <h3 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-bold tracking-tighter text-white group-hover:text-transparent group-hover:[-webkit-text-stroke:2px_rgba(255,255,255,1)] transition-all duration-700 leading-[0.9] md:max-w-5xl uppercase">
                         {item.Title}
                       </h3>
                       
                       <div className="mt-8 md:mt-0 flex flex-col space-y-2 text-left md:text-right">
                          <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold">
                            {isVideo ? "Video Production" : "Digital Asset"}
                          </span>
                          <span className="text-xs uppercase tracking-[0.2em] text-white font-bold">
                            {year}
                          </span>
                       </div>
                    </div>

                    {/* Main Image Container (Cinematic Wide Aspect Ratio) */}
                    <div className="w-full aspect-[4/3] md:aspect-[21/9] lg:aspect-[2.35/1] overflow-hidden relative border border-white/[0.05] rounded-sm bg-[#111111]">
                      <img 
                        src={item.Img || item.image_url} 
                        alt={item.Title} 
                        className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[1.5s] ease-[0.22,1,0.36,1]"
                      />
                      
                      {/* Hover Arrow Overlay */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700"></div>
                      
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500 bg-white text-black rounded-full w-24 h-24 flex items-center justify-center pointer-events-none shadow-2xl">
                         <ArrowUpRight className="w-8 h-8" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Bottom line */}
                    <div className="w-full h-px bg-white/10 mt-12 group-hover:bg-white/30 transition-colors duration-500"></div>
                  </motion.div>
               );
             })
          )}
        </div>

      </div>
    </div>
  );
};

export default Portofolio;