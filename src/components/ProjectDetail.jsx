import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ExternalLink, Github, Code2, Star,
  ChevronRight, Layers, Layout, Globe, Package, Cpu, Code, PlayCircle
} from "lucide-react";
import Swal from 'sweetalert2';

const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];
  
  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-500/50 transition-all duration-300 cursor-default shadow-sm hover:shadow-md">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600 group-hover:text-blue-500 transition-colors" />
        <span className="text-xs md:text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }) => {
  return (
    <li className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-slate-50 transition-all duration-300 border border-transparent hover:border-slate-200">
      <div className="relative mt-2">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm md:text-base text-slate-600 group-hover:text-slate-900 transition-colors">
        {feature}
      </span>
    </li>
  );
};

const ProjectStats = ({ project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl overflow-hidden relative shadow-md border border-slate-200">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50 blur-2xl z-0" />

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-slate-50 p-2 md:p-3 rounded-lg border border-slate-100 transition-all duration-300 hover:scale-105 hover:border-blue-200 hover:shadow-lg">
        <div className="bg-blue-100 p-1.5 md:p-2 rounded-full">
          <Code2 className="text-blue-600 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-bold text-blue-700">{techStackCount}</div>
          <div className="text-[10px] md:text-xs text-slate-500 font-medium">Total Teknologi</div>
        </div>
      </div>

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-slate-50 p-2 md:p-3 rounded-lg border border-slate-100 transition-all duration-300 hover:scale-105 hover:border-purple-200 hover:shadow-lg">
        <div className="bg-purple-100 p-1.5 md:p-2 rounded-full">
          <Layers className="text-purple-600 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-bold text-purple-700">{featuresCount}</div>
          <div className="text-[10px] md:text-xs text-slate-500 font-medium">Fitur Utama</div>
        </div>
      </div>
    </div>
  );
};

const handleGithubClick = (githubLink) => {
  if (githubLink === 'Private') {
    Swal.fire({
      icon: 'info',
      title: 'Source Code Private',
      text: 'Maaf, source code untuk proyek ini bersifat privat.',
      confirmButtonText: 'Mengerti',
      confirmButtonColor: '#6366f1',
      background: '#fff',
      color: '#000'
    });
    return false;
  }
  return true;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // FUNGSI HELPER VIDEO EMBED (Sama seperti di CardProject)
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
      const enhancedProject = {
        ...selectedProject,
        Features: selectedProject.Features || [],
        TechStack: selectedProject.TechStack || [],
        Link: isVideo ? selectedProject.video_url : selectedProject.Link, 
        Github: selectedProject.Github || (isVideo ? null : 'https://github.com/EkiZR'), 
        IsVideo: isVideo 
      };
      setProject(enhancedProject);
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold text-slate-800">Loading Project...</h2>
        </div>
      </div>
    );
  }

  const videoEmbedUrl = project.IsVideo ? getVideoEmbedUrl(project.Link) : null;

  return (
    <div className="min-h-screen bg-[#f8fafc] px-[2%] sm:px-0 relative overflow-hidden">
      
      <div className="fixed inset-0">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          
          <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12 animate-fadeIn">
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/50 backdrop-blur-xl rounded-xl text-slate-600 hover:bg-white transition-all duration-300 border border-slate-200 hover:border-blue-300 text-sm md:text-base shadow-sm hover:shadow-md"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-slate-400">
              <span>{project.IsVideo ? "Video Projects" : "Photo Projects"}</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-slate-700 font-medium truncate">{project.Title}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            
            <div className="space-y-6 md:space-y-10 animate-slideInLeft">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 bg-clip-text text-transparent leading-tight">
                  {project.Title}
                </h1>
                <div className="relative h-1 w-16 md:w-24">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-sm" />
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium">
                  {project.Description}
                </p>
              </div>

              <ProjectStats project={project} />

              <div className="flex flex-wrap gap-3 md:gap-4">
                {project.Link && (
                    <a
                    href={project.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto px-6 py-3 md:py-4 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-semibold shadow-lg hover:scale-105 hover:shadow-[#6366f1]/30 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                    {project.IsVideo ? (
                        <PlayCircle className="w-5 h-5 md:w-6 md:h-6" />
                    ) : (
                        <ExternalLink className="w-5 h-5 md:w-6 md:h-6" />
                    )}
                    <span className="text-base md:text-lg">
                        {project.IsVideo ? "Watch Video" : "Live Demo"}
                    </span>
                    </a>
                )}

                {project.Github && (
                    <a
                    href={project.Github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto px-6 py-3 md:py-4 rounded-xl bg-white text-slate-700 border border-slate-200 font-semibold hover:border-purple-500 hover:text-purple-600 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={(e) => !handleGithubClick(project.Github) && e.preventDefault()}
                    >
                    <Github className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="text-base md:text-lg">Github</span>
                    </a>
                )}
              </div>

              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-[3rem] md:mt-0 flex items-center gap-2 md:gap-3">
                  <Code2 className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  Technologies Used
                </h3>
                {project.TechStack.length > 0 ? (
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.TechStack.map((tech, index) => (
                      <TechBadge key={index} tech={tech} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm md:text-base text-slate-400">No technologies added.</p>
                )}
              </div>
            </div>

            <div className="space-y-6 md:space-y-10 animate-slideInRight">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl group bg-white">
                <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* TAMPILKAN VIDEO IFRAME JIKA ADA LINK VIDEO */}
                {project.IsVideo && videoEmbedUrl ? (
                   <div className="relative aspect-video">
                     <iframe
                        width="100%"
                        height="100%"
                        src={videoEmbedUrl}
                        title={project.Title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full object-cover"
                      ></iframe>
                   </div>
                ) : (
                  <img
                    src={project.Img}
                    alt={project.Title}
                    className="w-full object-cover transform transition-transform duration-700 will-change-transform group-hover:scale-105"
                    onLoad={() => setIsImageLoaded(true)}
                  />
                )}
              </div>

              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg space-y-6 hover:border-blue-300 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-500 group-hover:rotate-[20deg] transition-transform duration-300" />
                  Key Features
                </h3>
                {project.Features.length > 0 ? (
                  <ul className="list-none space-y-2">
                    {project.Features.map((feature, index) => (
                      <FeatureItem key={index} feature={feature} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400">No features added.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-fadeIn { animation: fadeIn 0.7s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.7s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.7s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
};

export default ProjectDetails;