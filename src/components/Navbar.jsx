import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-[#000000]/90 backdrop-blur-xl border-white/[0.05] py-4' : 'bg-transparent border-transparent py-6'}`}>
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Left: Logo */}
        <div className="flex-1">
          <a href="#Home" onClick={(e) => scrollToSection(e, "#Home")} className="inline-flex items-center space-x-3 text-white hover:opacity-70 transition-opacity">
            <div className="flex flex-wrap w-[18px] h-[18px] gap-[2px]">
              <div className="w-[8px] h-[8px] bg-white"></div>
              <div className="w-[8px] h-[8px] border border-white"></div>
              <div className="w-[8px] h-[8px] border border-white"></div>
              <div className="w-[8px] h-[8px] bg-white"></div>
            </div>
            <span className="text-sm font-bold tracking-[0.2em] uppercase">Rusdi</span>
          </a>
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex flex-1 justify-center space-x-10 text-[10px] font-bold tracking-widest text-white uppercase">
          <a href="#Home" onClick={(e) => scrollToSection(e, "#Home")} className="relative group hover:text-white/70 transition-colors">
            Home <sup className="text-[7px] ml-0.5 opacity-50 absolute -top-1 -right-2">01</sup>
          </a>
          <a href="#Portofolio" onClick={(e) => scrollToSection(e, "#Portofolio")} className="relative group hover:text-white/70 transition-colors">
            Portfolio <sup className="text-[7px] ml-0.5 opacity-50 absolute -top-1 -right-2">02</sup>
          </a>
          <a href="#About" onClick={(e) => scrollToSection(e, "#About")} className="relative group hover:text-white/70 transition-colors">
            About <sup className="text-[7px] ml-0.5 opacity-50 absolute -top-1 -right-2">03</sup>
          </a>
          <a href="#Contact" onClick={(e) => scrollToSection(e, "#Contact")} className="relative group hover:text-white/70 transition-colors">
            Contact <sup className="text-[7px] ml-0.5 opacity-50 absolute -top-1 -right-2">04</sup>
          </a>
        </div>

        {/* Right: CTA */}
        <div className="flex-1 flex justify-end">
          <a href="#Contact" onClick={(e) => scrollToSection(e, "#Contact")} className="group flex items-center space-x-4">
             <div className="flex flex-col text-right hidden sm:flex">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Let's Talk</span>
                <span className="text-[10px] text-white/50 tracking-widest uppercase">Available Now</span>
             </div>
             <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" strokeWidth={2.5} />
             </div>
          </a>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;