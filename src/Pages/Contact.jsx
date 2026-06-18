import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(
        "https://mditgdvocvugyorwrnqm.supabase.co/rest/v1/portfolio_comments",
        {
          name: formData.name,
          email: formData.email,
          content: formData.message,
        },
        {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for getting in touch. I will reply shortly.",
        confirmButtonColor: "#ffffff",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting comment:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#ffffff",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="Contact" className="w-full bg-[#000000] text-white pt-24 pb-12 border-t border-white/[0.05]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-16 md:mb-24">
          <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-white">03 &mdash; Contact</span>
          <span className="text-xs md:text-sm font-medium text-white/50 tracking-widest uppercase">Get in touch</span>
        </div>

        <div className="mt-12 md:mt-24 mb-16 flex flex-col gap-8">
           <motion.h2 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
             className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-bold tracking-tighter leading-[0.9] max-w-5xl text-white hover:text-transparent hover:[-webkit-text-stroke:1px_rgba(255,255,255,1)] transition-colors duration-500"
           >
             LET'S WORK <br /> TOGETHER.
           </motion.h2>
           
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1, delay: 0.5 }}
             className="flex flex-col space-y-2 text-xs uppercase tracking-[0.2em] font-bold text-white/50"
           >
              <span>Jakarta, Indonesia</span>
              <span><span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse mr-2"></span>Available for Freelance</span>
           </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 border-t border-white/[0.05] pt-16 mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-4 flex flex-col space-y-12"
          >
            <div className="space-y-10">
               <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-3">Email</div>
                  <a href="mailto:rusdi@example.com" className="text-xl md:text-2xl font-medium hover:text-white/50 transition-colors tracking-tight">rusdi@example.com</a>
               </div>
               <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-3">Socials</div>
                  <div className="flex flex-col space-y-3">
                     <a href="#" className="text-xl font-medium hover:text-white/50 transition-colors tracking-tight">Instagram ↗</a>
                     <a href="#" className="text-xl font-medium hover:text-white/50 transition-colors tracking-tight">LinkedIn ↗</a>
                     <a href="#" className="text-xl font-medium hover:text-white/50 transition-colors tracking-tight">YouTube ↗</a>
                  </div>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-8 lg:col-span-7 lg:col-start-6"
          >
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="space-y-2 group">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 group-focus-within:text-white transition-colors">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-2xl font-medium tracking-tight focus:outline-none focus:border-white transition-colors placeholder:text-white/10"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 group-focus-within:text-white transition-colors">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-2xl font-medium tracking-tight focus:outline-none focus:border-white transition-colors placeholder:text-white/10"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 group-focus-within:text-white transition-colors">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Tell me about your project..."
                  className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-2xl font-medium tracking-tight focus:outline-none focus:border-white transition-colors placeholder:text-white/10 resize-none"
                />
              </div>

              <div className="flex justify-start md:justify-end pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative overflow-hidden group bg-white text-black px-10 py-5 font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white/90 transition-all disabled:opacity-70 flex items-center"
                >
                  <span className="relative z-10 flex items-center">
                    {isSubmitting ? "Sending..." : "Submit Request"}
                    {!isSubmitting && <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>}
                  </span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Footer info */}
        <div className="mt-32 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
           <span>© {new Date().getFullYear()} Rusdi. All Rights Reserved.</span>
           <span className="mt-4 md:mt-0">Inspired by Fuel</span>
        </div>

      </div>
    </div>
  );
};

export default Contact;