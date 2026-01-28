import React from 'react';
import { Sparkles } from 'lucide-react';

const clients = [
  { id: 1, name: "Mexc", logo: "mexc.svg" },
  { id: 2, name: "Triv", logo: "triv.svg" },
  { id: 3, name: "BYD", logo: "byd.svg" },
  { id: 4, name: "KPKNL", logo: "kpknl.png" },
  { id: 5, name: "sbcskin", logo: "sbcskin.png" },
  { id: 6, name: "bravado", logo: "bravado.png" },
  { id: 7, name: "tamanati", logo: "tamanati.png" },
  { id: 8, name: "goodsmoment", logo: "goodsmoment.png" },
  { id: 9, name: "alegra", logo: "alegra.svg" },
  { id: 9, name: "aftrday", logo: "aftrday.png" },
];

const ClientTrust = () => {
  return (
    <section id="Clients" className="pt-20 pb-20 relative overflow-hidden">
        
        <div className="container mx-auto px-[5%]">
            <div className="text-center mb-12" data-aos="fade-down">
                {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-[#6366f1]/20 mb-4 shadow-sm backdrop-blur-sm">
                    <Sparkles className="w-4 h-4 text-[#6366f1]" />
                    <span className="text-sm font-medium text-[#6366f1]">Trusted Partnerships</span>
                </div> */}
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">Industry Leaders</span>
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Collaborating with visionary brands to create impactful visual stories.
                </p>
            </div>

            {/* UBAH DISINI: Gunakan FLEX agar baris kedua otomatis center */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
                {clients.map((client, index) => {
                    // Logic untuk memperbesar logo tertentu
                    const isLargeLogo = ["bravado", "tamanati", "goodsmoment", "alegra", "aftrday"].includes(client.name);

                    return (
                        <div 
                            key={client.id}
                            // ATUR LEBAR ITEM DISINI:
                            // w-1/2 (2 per baris di HP)
                            // md:w-1/4 (4 per baris di Tablet)
                            // lg:w-1/6 (sekitar 5-6 per baris di Desktop)
                            // width yang fleksibel + justify-center akan membuat sisa item di baris bawah jadi di tengah.
                            className="group w-1/3 md:w-1/4 lg:w-1/6 flex items-center justify-center p-2 transition-all duration-300 hover:scale-110 cursor-pointer"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <img 
                                src={client.logo} 
                                alt={client.name} 
                                // Logic Ukuran Gambar:
                                className={`
                                    ${isLargeLogo ? 'h-20 md:h-24 w-auto' : 'h-10 md:h-12 w-auto'}
                                    object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]
                                `}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
  );
};

export default ClientTrust;