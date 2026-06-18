import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useNavigate } from "react-router-dom";

const positionStyles = [
  { scale: 1, y: 12 },
  { scale: 0.95, y: -16 },
  { scale: 0.9, y: -44 },
];

function CardContent({ data, onClick }) {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="-outline-offset-1 flex h-[200px] w-full items-center justify-center overflow-hidden rounded-xl outline outline-white/10 relative">
        <img
          src={data.Img || data.image_url || "/placeholder.svg"}
          alt={data.Title}
          className="h-full w-full select-none object-cover filter brightness-90 group-hover:brightness-100 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
      </div>
      <div className="flex w-full items-center justify-between gap-2 px-3 pb-6">
        <div className="flex min-w-0 flex-1 flex-col text-left">
          <span className="truncate font-medium text-white text-lg">{data.Title}</span>
          <span className="text-white/50 text-xs mt-1 truncate uppercase tracking-widest">{data.Description || "Visual Work"}</span>
        </div>
        <button 
          onClick={(e) => {
             e.stopPropagation();
             onClick();
          }}
          className="flex h-10 shrink-0 cursor-pointer select-none items-center gap-0.5 rounded-full bg-white pl-4 pr-3 text-sm font-bold text-black uppercase tracking-widest hover:scale-105 transition-transform"
        >
          View
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="square"
            className="ml-1"
          >
            <path d="M9.5 18L15.5 12L9.5 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function AnimatedCard({ item, index, onClick }) {
  const { scale, y } = positionStyles[index] ?? positionStyles[2];
  const zIndex = 3 - index;

  return (
    <motion.div
      initial={{ opacity: 0, y: -60, scale: 0.8 }}
      animate={{ opacity: 1, y, scale, zIndex }}
      exit={{ y: 400, scale: 1, opacity: 0, zIndex: 10 }}
      transition={{
        type: "spring",
        duration: 0.8,
        bounce: 0,
      }}
      style={{
        left: "50%",
        x: "-50%",
        bottom: 0,
      }}
      className="absolute flex h-[280px] w-[324px] items-center justify-center overflow-hidden rounded-t-xl border-x border-t border-white/10 bg-[#111111] p-1 shadow-2xl will-change-transform sm:w-[512px] cursor-pointer group"
      onClick={onClick}
    >
      <CardContent data={item} onClick={onClick} />
    </motion.div>
  );
}

export default function AnimatedCardStack({ items }) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!items || items.length === 0) return;
    
    // Map scroll progress to active index
    const sections = items.length;
    let index = Math.floor(latest * sections);
    if (index >= sections) index = sections - 1;
    if (index < 0) index = 0;
    
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  if (!items || items.length === 0) return (
    <div className="w-full flex justify-center py-24 text-white/50 text-sm tracking-widest uppercase font-bold">
       Loading Projects...
    </div>
  );

  const visibleCards = [];
  // Ensure we always have at least enough items for the stack visually (up to 3)
  const maxVisible = Math.min(3, items.length);
  for (let i = 0; i < maxVisible; i++) {
      const itemIndex = (activeIndex + i) % items.length;
      visibleCards.push({
         ...items[itemIndex],
         uniqueKey: `item-${itemIndex}`
      });
  }

  // The container needs to be tall enough to allow scrolling through all items.
  // 100vh for the initial view + 60vh for each additional item to scroll through.
  const containerHeight = `${100 + (items.length - 1) * 60}vh`;

  return (
    <div ref={containerRef} style={{ height: containerHeight }} className="w-full relative mt-12 mb-24">
      {/* Sticky wrapper that stays on screen while container scrolls */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="mb-12 md:mb-16 text-center flex flex-col items-center justify-center"
        >
           <span className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold mb-4">
              Scroll to explore
           </span>
           <div className="w-px h-12 md:h-16 bg-gradient-to-b from-white/20 to-transparent"></div>
        </motion.div>

        <div className="relative h-[380px] w-full sm:w-[644px]">
          <AnimatePresence initial={false}>
            {visibleCards.map((card, index) => (
              <AnimatedCard 
                 key={card.uniqueKey} 
                 item={card} 
                 index={index} 
                 onClick={() => navigate(`/project/${card.id}`)}
              />
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
