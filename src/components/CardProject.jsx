import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, PlayCircle } from 'lucide-react';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id, type }) => {
  
  // Fungsi Helper untuk Video Embed (YouTube/GDrive)
  const getVideoEmbedUrl = (url) => {
    if (!url) return null;

    // 1. Cek YouTube
    const ytMatch = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    if (ytMatch && ytMatch[2].length === 11) {
      return `https://www.youtube.com/embed/${ytMatch[2]}`;
    }

    // 2. Cek Google Drive
    const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch && driveMatch[1]) {
      return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    }

    return null;
  };

  const isVideo = type === 'video' && ProjectLink;
  const videoEmbedUrl = isVideo ? getVideoEmbedUrl(ProjectLink) : null;

  const handleLinkClick = (e) => {
    if (!ProjectLink) {
      console.log("Link kosong");
      e.preventDefault();
      alert("Link tidak tersedia");
    }
  };

  return (
    <div className="group relative w-full">
      
      <div className="relative overflow-hidden rounded-xl bg-white/30 backdrop-blur-lg border border-white/20 shadow-xl transition-all duration-300 hover:shadow-purple-500/20 hover:-translate-y-2">
        
        {/* AREA MEDIA (Gambar / Video) */}
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
          {isVideo && videoEmbedUrl ? (
            <iframe
              width="100%"
              height="100%"
              src={videoEmbedUrl}
              title={Title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full object-cover"
            ></iframe>
          ) : (
            <>
               <img
                src={Img}
                alt={Title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              {type === 'video' && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all">
                    <PlayCircle className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"/>
                 </div>
              )}
            </>
          )}
        </div>
    
        <div className="p-5">
          <div className="space-y-3">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent truncate">
              {Title}
            </h3>
            
            <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
              {Description}
            </p>
            
            <div className="pt-4 flex items-center justify-between">
              
              {/* LOGIKA TOMBOL:
                  Hanya menampilkan 1 tombol utama per kartu.
                  - Jika Video: Tampilkan "Watch Video"
                  - Jika Foto: Tampilkan "Details" (mengarah ke GDrive)
              */}
              {ProjectLink ? (
                <a
                  href={ProjectLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  {/* Icon & Text berubah sesuai tipe */}
                  {type === 'video' ? (
                    <>
                        <PlayCircle className="w-4 h-4" />
                        <span className="text-sm font-semibold">Watch Video</span>
                    </>
                  ) : (
                    <>
                        <span className="text-sm font-semibold">Details</span>
                        <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </a>
              ) : (
                <span className="text-slate-400 text-sm">Not Available</span>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;