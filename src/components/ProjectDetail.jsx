import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Code2, Star, Layers, PlayCircle } from "lucide-react";
import Swal from 'sweetalert2';
import { BentoItem, withHover } from "./animations";
import TextStagger from "./TextStagger";

const HoverButton = withHover(({ onClick, href, children, className }) => {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${className}`}>
      {children}
    </button>
  );
});

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  const getVideoEmbedUrl = (url) => {
    if (!url) return null;
    const ytMatch = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    if (ytMatch && ytMatch[2].length === 11) return `https://www.youtube.com/embed/${ytMatch[2]}`;
    const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch && driveMatch[1]) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    return null;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const storedCertificates = JSON.parse(localStorage.getItem("certificates")) || [];
    
    let selectedProject = storedProjects.find((p) => String(p.id) === id);
    let isVideo = false;

    if (!selectedProject) {
        selectedProject = storedCertificates.find((p) => String(p.id) === id);
        isVideo = true;
    }

    if (selectedProject) {
      setProject({
        ...selectedProject,
        Features: selectedProject.Features || [],
        TechStack: selectedProject.TechStack || [],
        Link: isVideo ? selectedProject.video_url : selectedProject.Link, 
        Github: selectedProject.Github || (isVideo ? null : 'https://github.com/EkiZR'), 
        IsVideo: isVideo 
      });
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center pt-24">
        <h2 className="text-2xl font-bold text-slate-800">Loading Project...</h2>
      </div>
    );
  }

  const videoEmbedUrl = project.IsVideo ? getVideoEmbedUrl(project.Link) : null;

  return (
    <div className="bg-[#f4f4f0] px-6 md:px-12 pt-32 pb-32 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="mb-12">
          <HoverButton onClick={() => navigate(-1)} className="text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-black border-b border-transparent hover:border-black rounded-none px-0 py-1 transition-all">
            ← Back to Work
          </HoverButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <BentoItem className="flex flex-col justify-center space-y-6" delay={0.1}>
            <TextStagger 
              text={project.Title}
              delay={0.05}
              duration={0.6}
              color="#111111"
              className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1]"
              trigger="inView"
            />
            <p className="text-xl text-slate-600 leading-relaxed mt-4 font-light max-w-2xl">
              {project.Description}
            </p>

            <div className="flex gap-6 pt-8 border-t border-slate-300 mt-8">
              {project.Link && (
                <HoverButton href={project.Link} className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-900 rounded-none px-0 py-1 hover:opacity-70">
                  {project.IsVideo ? "Watch Video" : "Live Demo"} ↗
                </HoverButton>
              )}
              {project.Github && (
                <HoverButton href={project.Github} className="text-sm font-bold uppercase tracking-widest text-slate-500 border-b border-transparent hover:border-slate-500 hover:text-slate-900 rounded-none px-0 py-1" onClick={(e) => {
                  if (project.Github === 'Private') {
                    e.preventDefault();
                    Swal.fire({ icon: 'info', title: 'Private', text: 'Source code privat.', confirmButtonColor: '#111111' });
                  }
                }}>
                  Github ↗
                </HoverButton>
              )}
            </div>
          </BentoItem>

          <BentoItem className="p-0 overflow-hidden rounded-[20px] shadow-2xl" delay={0.2}>
            {project.IsVideo && videoEmbedUrl ? (
              <iframe width="100%" height="100%" src={videoEmbedUrl} className="w-full h-full aspect-[16/10]" frameBorder="0" allowFullScreen></iframe>
            ) : (
              <img src={project.Img} alt={project.Title} className="w-full h-full object-cover aspect-[16/10]" />
            )}
          </BentoItem>

          <BentoItem className="space-y-4 border-t border-slate-300 pt-8" delay={0.3}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.TechStack.map((tech, idx) => (
                <span key={idx} className="px-4 py-2 bg-slate-200/50 rounded-full text-slate-900 text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </BentoItem>

          <BentoItem className="space-y-4 border-t border-slate-300 pt-8" delay={0.4}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
              Key Features
            </h3>
            <ul className="space-y-4">
              {project.Features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span className="text-slate-700 text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </BentoItem>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;