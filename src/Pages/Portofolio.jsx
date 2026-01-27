import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabase"; 
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import { Camera, Video, Cpu, ChevronDown, ChevronUp } from "lucide-react"; 

// --- Komponen ToggleButton (See More / Less) ---
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-6 py-2.5 
      rounded-full 
      text-[#6366f1] 
      border border-[#6366f1]/30 
      font-semibold 
      hover:bg-gradient-to-r hover:from-[#6366f1] hover:to-[#a855f7] hover:text-white hover:border-transparent 
      transition-all duration-300 
      shadow-md hover:shadow-lg hover:-translate-y-1
      flex items-center gap-2 mx-auto
    "
  >
    {isShowingMore ? (
        <>
            Show Less <ChevronUp className="w-5 h-5 group-hover:animate-bounce" />
        </>
    ) : (
        <>
            See More Projects <ChevronDown className="w-5 h-5 group-hover:animate-bounce" />
        </>
    )}
  </button>
);

ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isShowingMore: PropTypes.bool.isRequired,
};

// --- Komponen TabPanel ---
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// --- Data Tech Stack (Skills) ---
const techStacks = [
    { icon: "premier-pro.svg", language: "Premiere Pro" },
    { icon: "capcut.svg", language: "Capcut" },
    { icon: "lightroom.svg", language: "Lightroom" },
    { icon: "vsco.svg", language: "VSCO" },
    { icon: "illustrator.svg", language: "Illustrator" },
    { icon: "canva.svg", language: "Canva" },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [videoProjects, setVideoProjects] = useState([]); // Ganti nama state certificates -> videoProjects biar jelas
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [projectsResponse, videosResponse] = await Promise.all([
        supabase.from("projects").select("*").order('id', { ascending: true }),
        supabase.from("video_projects").select("*").order('id', { ascending: true }), 
      ]);

      if (projectsResponse.error) throw projectsResponse.error;
      if (videosResponse.error) throw videosResponse.error;

      setProjects(projectsResponse.data || []);
      setVideoProjects(videosResponse.data || []);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }, []);

  useEffect(() => {
    fetchData(); 
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Reset Show More saat pindah tab
    setShowAllProjects(false);
    setShowAllVideos(false);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllVideos(prev => !prev);
    }
  }, []);

  // Filter data yang akan ditampilkan
  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedVideos = showAllVideos ? videoProjects : videoProjects.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#f8fafc] overflow-hidden" id="Portofolio">
      
      {/* Header Section */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base mt-2">
           I transform moments into memories and raw footage into cinematic stories. 
           Explore my photography and videography works below.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar Tabs */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#64748b",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#6366f1",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                },
                "&.Mui-selected": {
                  color: "#6366f1",
                  background: "rgba(139, 92, 246, 0.1)",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                },
              },
              "& .MuiTabs-indicator": { height: 0 },
              "& .MuiTabs-flexContainer": { gap: "8px" },
            }}
          >
            <Tab icon={<Camera className="mb-2 w-5 h-5" />} label="Photo Projects" {...a11yProps(0)} />
            <Tab icon={<Video className="mb-2 w-5 h-5" />} label="Video Projects" {...a11yProps(1)} />
            <Tab icon={<Cpu className="mb-2 w-5 h-5" />} label="Skills" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          {/* TAB 0: PHOTO PROJECTS */}
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayedProjects.length > 0 ? (
                    displayedProjects.map((project, index) => (
                      <div key={project.id || index} data-aos="fade-up">
                        <CardProject
                          Img={project.Img}
                          Title={project.Title}
                          Description={project.Description}
                          Link={project.Link}
                          id={project.id}
                          type="photo" // TYPE PHOTO
                        />
                      </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 text-slate-400">
                        No photo projects found.
                    </div>
                )}
              </div>
            </div>
             {/* Tombol See More Photos */}
             {projects.length > initialItems && (
              <div className="mt-8 w-full flex justify-center">
                <ToggleButton onClick={() => toggleShowMore('projects')} isShowingMore={showAllProjects}/>
              </div>
            )}
          </TabPanel>

          {/* TAB 1: VIDEO PROJECTS */}
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayedVideos.length > 0 ? (
                    displayedVideos.map((video, index) => (
                      <div key={video.id || index} data-aos="fade-up">
                        <CardProject
                          Img={video.Img}
                          Title={video.Title}
                          Description={video.Description} 
                          Link={video.video_url} // Pastikan column di DB 'video_url'
                          id={video.id}
                          type="video" // TYPE VIDEO
                        />
                      </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 text-slate-400">
                        No video projects found.
                    </div>
                )}
              </div>
            </div>
             {/* Tombol See More Videos */}
             {videoProjects.length > initialItems && (
              <div className="mt-8 w-full flex justify-center">
                <ToggleButton onClick={() => toggleShowMore('videos')} isShowingMore={showAllVideos}/>
              </div>
            )}
          </TabPanel>

          {/* TAB 2: SKILLS */}
          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}