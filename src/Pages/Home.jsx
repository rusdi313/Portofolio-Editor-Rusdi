import React, { useState, useEffect, useCallback, memo } from "react"
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import MobileShowcase from "../components/MobileShowcase"
import { Helmet } from 'react-helmet-async'

// --- KOMPONEN MEMOIZED (TEMA LIGHT) ---

const StatusBadge = memo(() => (
  <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-slate-200 shadow-sm">
        <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-purple-500" />
          Available for Hire
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-10"></span>
        <span className="relative text-[#0f172a]"> {/* Warna Gelap */}
          Visual
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Storyteller
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-white/60 backdrop-blur-sm border border-slate-200 text-sm text-slate-600 hover:bg-white hover:text-purple-600 hover:border-purple-200 transition-all shadow-sm">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-30 blur-md group-hover:opacity-60 transition-all duration-700"></div>
      <div className="relative h-11 bg-white backdrop-blur-xl rounded-lg border border-slate-100 leading-none overflow-hidden shadow-md">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/10 to-[#8644c5]/10"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="text-slate-700 font-medium z-10 group-hover:text-purple-700">
            {text}
          </span>
          <Icon className={`w-4 h-4 text-slate-700 ${text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10 group-hover:text-purple-700`} />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-10 group-hover:opacity-30 transition duration-300"></div>
      <div className="relative rounded-xl bg-white/70 backdrop-blur-xl p-2 flex items-center justify-center border border-slate-200 shadow-sm group-hover:border-purple-200 transition-all duration-300">
        <Icon className="w-5 h-5 text-slate-500 group-hover:text-purple-600 transition-colors" />
      </div>
    </button>
  </a>
));

// --- KONSTANTA DATA (DISESUAIKAN DENGAN PHOTO/VIDEO) ---
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Professional Photographer", "Video Editor", "Content Creator"]; // Diubah
const TECH_STACK = ["Premiere Pro", "Capcut", "Lightroom", "VSCO", "Illustrator", "Canva"]; // Diubah
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/rusdi313" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/rusdi-aulia-romadhon-11b44229b/" },
  { icon: Instagram, link: "https://www.instagram.com/rusdirmdhn_/?hl=id" }
];

const Home = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
      });
    };

    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  // --- SEO Configuration ---
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rusdi Aulia Romadhon",
    "url": "https://portofolio-rusdi.vercel.app/",
    "image": "https://rusdi-portofolio.vercel.app/Photo.png",
    "sameAs": [
      "https://github.com/rusdi313",
      "https://www.linkedin.com/in/rusdi-aulia-romadhon-11b44229b/",
      "https://www.instagram.com/rusdirmdhn_/?hl=id"
    ],
    "jobTitle": "Photographer & Video Editor",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "description": "Portofolio Rusdi Aulia Romadhon, Photographer, Videographer, dan Editor profesional."
  };

  return (
    // UBAH BACKGROUND DISINI: bg-[#f8fafc] untuk warna putih terang
    <div className="min-h-screen bg-[#f8fafc] overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%]" id="Home">
      
      <Helmet>
        <title>Rusdi Aulia Romadhon | Visual Storyteller</title>
        <meta name="description" content="Selamat datang di portofolio resmi Rusdi Aulia Romadhon. Professional Photographer dan Video Editor." />
        <meta name="keywords" content="Rusdi Aulia Romadhon, Photographer, Videographer, Video Editor, Premiere Pro, After Effects" />
        <meta name="author" content="Rusdi Aulia Romadhon" />
        <meta property="og:title" content="Rusdi Aulia Romadhon - Visual Storyteller" />
        <meta property="og:description" content="Lihat karya photography dan videography terbaru dari Rusdi Aulia Romadhon." />
        <meta property="og:image" content="/Photo.png" />
        <meta property="og:url" content="https://portofolio-rusdi.vercel.app/" />
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      </Helmet>

      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        
        <div className="container mx-auto min-h-screen flex flex-col justify-center pt-32 lg:pt-0"> 
          
          <div className="flex flex-col lg:flex-row items-center justify-center md:justify-between gap-10 lg:gap-20">
            
            {/* Left Column */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1"
              data-aos="fade-right"
              data-aos-delay="200">
              
              <div className="space-y-4 sm:space-y-6">
                <StatusBadge />
                <MainTitle />

                {/* Typing Effect - Ubah warna text jadi gelap */}
                <div className="h-8 flex items-center" data-aos="fade-up" data-aos-delay="800">
                  <span className="text-xl md:text-2xl bg-slate-700 bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
                </div>

                {/* Description - Ubah warna text jadi abu-abu gelap */}
                <p className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed font-light"
                  data-aos="fade-up"
                  data-aos-delay="1000">
                  Capturing moments, creating emotions. I specialize in bringing stories to life through lens and editing.
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3 justify-start" data-aos="fade-up" data-aos-delay="1200">
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-row gap-3 w-full justify-start" data-aos="fade-up" data-aos-delay="1400">
                  <CTAButton href="#Portofolio" text="Portfolio" icon={ExternalLink} />
                  <CTAButton href="#Contact" text="Contact" icon={Mail} />
                </div>

                {/* Social Links */}
                <div className="hidden sm:flex gap-4 justify-start" data-aos="fade-up" data-aos-delay="1600">
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - MOBILE SHOWCASE */}
            <div className="w-full lg:w-1/2 h-auto relative flex items-center justify-center order-2 lg:order-2 mb-12 lg:mb-0"
              data-aos="fade-left"
              data-aos-delay="600">
              
              <MobileShowcase />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);