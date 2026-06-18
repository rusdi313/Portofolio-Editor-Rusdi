import React from "react";
import { ArrowRight, PlayCircle } from "lucide-react";
import { withHover } from "./animations";

const CardProject = withHover(({ Img, Title, Description, Link: ProjectLink, id, type }) => {
  const getVideoEmbedUrl = (url) => {
    if (!url) return null;
    const ytMatch = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    if (ytMatch && ytMatch[2].length === 11) {
      return `https://www.youtube.com/embed/${ytMatch[2]}`;
    }
    const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch && driveMatch[1]) {
      return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    }
    return null;
  };

  const isVideo = type === "video" && ProjectLink;
  const videoEmbedUrl = isVideo ? getVideoEmbedUrl(ProjectLink) : null;

  const handleLinkClick = (e) => {
    if (!ProjectLink) {
      e.preventDefault();
      alert("Link tidak tersedia");
    }
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col h-full w-full">
      <div className="relative aspect-video w-full overflow-hidden">
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
            <img src={Img} alt={Title} className="w-full h-full object-cover" />
            {type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <PlayCircle className="w-16 h-16 text-white opacity-80" />
              </div>
            )}
          </>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-800 truncate mb-2">{Title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
          {Description}
        </p>

        {ProjectLink ? (
          <a
            href={ProjectLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="w-full inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium transition-colors"
          >
            {type === "video" ? (
              <>
                <PlayCircle className="w-4 h-4" />
                <span>Watch Video</span>
              </>
            ) : (
              <>
                <span>Details</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </a>
        ) : (
          <span className="text-slate-400 text-sm mt-auto">Not Available</span>
        )}
      </div>
    </div>
  );
});

export default CardProject;