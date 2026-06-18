import React from "react";
import TextStagger from "../components/TextStagger";
import { motion } from "framer-motion";
import { supabase } from "../supabase";

const About = () => {
  const [profileUrl, setProfileUrl] = React.useState("");

  React.useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data, error } = await supabase.from("portfolio_profiles").select("*").single();
        if (data && !error) {
          setProfileUrl(data.image_url || "");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfileData();
  }, []);

  return (
    <div id="About" className="w-full bg-[#f4f4f4] text-[#000000] pt-24 pb-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-black/10 pb-6 mb-16 md:mb-32">
          <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em]">01 &mdash; About</span>
          <span className="text-xs md:text-sm font-medium text-black/50 tracking-widest uppercase">Overview</span>
        </div>

        {/* Massive Text Entry */}
        <div className="w-full flex flex-col items-start mb-24 md:mb-40">
           <TextStagger 
              text="Design-forward editing crafting bold visuals, structured layouts, and high-impact cinematic experiences."
              delay={0.02}
              duration={0.6}
              color="#000000"
              className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter leading-[1.0] text-left max-w-6xl"
              trigger="inView"
           />
        </div>

        {/* Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
           
           {/* Left: Vertical Image */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
             className="lg:col-span-5 relative"
           >
             <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-black/20"></div>
             <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-black/20"></div>
             
             {profileUrl ? (
               <img 
                 src={profileUrl} 
                 alt="Profile" 
                 className="w-full aspect-[3/4] object-cover filter grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
               />
             ) : (
               <div className="w-full aspect-[3/4] bg-black/5 animate-pulse flex items-center justify-center">
                  <span className="text-black/30 font-bold text-xs uppercase tracking-[0.2em]">Loading Profile</span>
               </div>
             )}
           </motion.div>

           {/* Right: Text Information */}
           <div className="lg:col-span-7 flex flex-col space-y-16 md:space-y-24 mt-8 lg:mt-0">
              
              {/* Feature 1 */}
              <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12"
              >
                 <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mt-2 shrink-0 w-24">(Who)</span>
                 <p className="text-2xl md:text-4xl text-black font-medium leading-[1.2] tracking-tight">
                   Seorang Mahasiswa Teknik Informatika yang memiliki ketertarikan besar dalam dunia Fotografi dan Videografi. Saya berfokus pada menciptakan visual yang bercerita dan sinematik.
                 </p>
              </motion.div>

              <div className="w-full h-px bg-black/10"></div>

              {/* Feature 2 */}
              <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.8, delay: 0.3 }}
                 className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12"
              >
                 <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mt-2 shrink-0 w-24">(Vision)</span>
                 <p className="text-2xl md:text-4xl text-black font-medium leading-[1.2] tracking-tight">
                   Selalu berusaha mengabadikan momen terbaik dalam setiap frame. Memadukan estetika modern dengan fungsionalitas visual untuk memberikan hasil yang berdampak.
                 </p>
              </motion.div>

           </div>
        </div>

      </div>
    </div>
  );
};

export default About;