import React, { forwardRef, useState } from "react";
import { motion } from "framer-motion";

// Helper for random color (similar to Framer's)
const randomColor = () => {
  const colors = ["#0099FF", "#FF3366", "#33CC99", "#FF9933", "#9933FF", "#E2E8F0", "#1E293B"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const withRotate = (Component) => {
  return forwardRef((props, ref) => {
    return (
      <motion.div
        ref={ref}
        animate={{ rotate: [0, 90, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="inline-block"
      >
        <Component {...props} />
      </motion.div>
    );
  });
};

export const withHover = (Component) => {
  return forwardRef((props, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="w-full h-full"
      >
        <Component {...props} />
      </motion.div>
    );
  });
};

export const withRandomColor = (Component) => {
  return forwardRef((props, ref) => {
    const [bgColor, setBgColor] = useState("#f8fafc"); // Default light color

    return (
      <motion.div
        ref={ref}
        animate={{ backgroundColor: bgColor }}
        transition={{ duration: 0.5 }}
        onClick={() => setBgColor(randomColor())}
        className="w-full h-full rounded-2xl overflow-hidden cursor-pointer"
      >
        <Component {...props} />
      </motion.div>
    );
  });
};

// A Bento Box wrapper component
export const BentoItem = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-3xl p-6 shadow-sm border border-slate-100 overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};
