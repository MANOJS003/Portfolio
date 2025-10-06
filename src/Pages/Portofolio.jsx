import React, { useEffect, useState, useCallback } from "react";
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
import useMediaQuery from "@mui/material/useMediaQuery";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import experiences from "../data/experiences.json";
import { Code, Award, Boxes, Briefcase } from "lucide-react";
import skills from "../data/skills.json";
import certificatesData from "../data/certificates.json";
import projectsData from "../data/projects.json";
// Debug: Log the imported projects data
console.log('Imported projectsData:', JSON.stringify(projectsData, null, 2));

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

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
        <Box sx={{ p: { xs: 1, sm: 3 } }} component="section">
          {children}
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

// Tech stacks now sourced from JSON for easy updates
const techStacks = skills;

// Experiences are now sourced from src/data/experiences.json so multiple pages can reuse

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  // Map query tab names to indices
  const tabIndexByName = {
    projects: 0,
    certificates: 1,
    tech: 2,
    experience: 3,
  };
  const tabNameByIndex = ['projects', 'certificates', 'tech', 'experience'];
  // Helpers for Experience date formatting and tenure
  const formatDate = (iso) => {
    if (!iso) return null;
    if (typeof iso === 'string' && iso.toLowerCase() === 'present') return null;
    const d = new Date(iso);
    if (isNaN(d)) return null;
    return d.toLocaleString(undefined, { month: 'short', year: 'numeric' });
  };
  const calcTenure = (startISO, endISO) => {
    if (!startISO) return null;
    const start = new Date(startISO);
    const end = (!endISO || (typeof endISO === 'string' && endISO.toLowerCase() === 'present'))
      ? new Date()
      : new Date(endISO);
    if (isNaN(start) || isNaN(end)) return null;
    // If start is in the future relative to end (today), show zeroed tenure
    if (end < start) return `0 months 0 days`;

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    // Adjust days
    if (days < 0) {
      // days in the previous month relative to `end`
      const daysInPrevMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
      days += daysInPrevMonth;
      months -= 1;
    }

    // Adjust months
    if (months < 0) {
      months += 12;
      years -= 1;
    }

    const yLabel = years === 1 ? 'year' : 'years';
    const mLabel = months === 1 ? 'month' : 'months';
    const dLabel = days === 1 ? 'day' : 'days';

    const parts = [];
    if (years > 0) parts.push(`${years} ${yLabel}`);
    // Always show months (even if 0) so the UI displays months consistently
    parts.push(`${months} ${mLabel}`);
    // Always show days
    parts.push(`${days} ${dLabel}`);

    return parts.join(' ');
  };
  
  useEffect(() => {
    console.log('Initial projectsData:', projectsData);
    if (projectsData && projectsData.projects) {
      // Log each project with its ID
      projectsData.projects.forEach((proj, idx) => {
        console.log(`Project ${idx}:`, { id: proj.id, title: proj.Title, hasId: !!proj.id });
      });
      
      // Ensure all projects have IDs
      const projectsWithIds = projectsData.projects.map((proj, idx) => ({
        ...proj,
        id: proj.id || `project-${idx}` // Ensure every project has an ID
      }));
      
      console.log('Projects with IDs:', projectsWithIds);
      setProjects(projectsWithIds);
    } else {
      console.error('No projects data found in projectsData:', projectsData);
    }
  }, []);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = 3;
  const initialProjects = 2;

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false,
    });
    // Debug log
    console.log('Total certificates:', certificatesData.length);
    console.log('Certificates data:', certificatesData);
    // On mount, read ?tab= from URL and set the initial tab
    try {
      const params = new URLSearchParams(window.location.search);
      const tabParam = (params.get('tab') || '').toLowerCase();
      if (tabParam && tabParam in tabIndexByName) {
        setValue(tabIndexByName[tabParam]);
      }
      // Listen to back/forward nav to keep tab in sync
      const onPop = () => {
        const params2 = new URLSearchParams(window.location.search);
        const tab2 = (params2.get('tab') || '').toLowerCase();
        if (tab2 in tabIndexByName) setValue(tabIndexByName[tab2]);
      };
      window.addEventListener('popstate', onPop);

      // Listen to custom event from About to switch tabs without reload
      const onCustom = (e) => {
        const tab = (e?.detail?.tab || '').toLowerCase();
        if (tab in tabIndexByName) {
          setValue(tabIndexByName[tab]);
          // Keep URL updated
          const url = new URL(window.location.href);
          url.searchParams.set('tab', tab);
          url.hash = 'Portofolio';
          window.history.replaceState({}, '', url.toString());
        }
      };
      window.addEventListener('portfolio-tab-change', onCustom);

      return () => {
        window.removeEventListener('popstate', onPop);
        window.removeEventListener('portfolio-tab-change', onCustom);
      };
    } catch (e) {
      // ignore if not available
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Keep URL in sync so About links scroll to the right tab
    try {
      const name = tabNameByIndex[newValue] || 'projects';
      const url = new URL(window.location.href);
      url.searchParams.set('tab', name);
      url.hash = 'Portofolio';
      window.history.replaceState({}, '', url.toString());
    } catch (e) {
      // ignore URL errors in non-browser envs
    }
  };

  const toggleShowMore = (type) => {
    if (type === 'projects') {
      setShowAllProjects(!showAllProjects);
    } else if (type === 'certificates') {
      setShowAllCertificates(!showAllCertificates);
    }
  };

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialProjects);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
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
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Responsive, scrollable Tabs for mobile */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant={isMdUp ? "fullWidth" : "scrollable"}
            scrollButtons={isMdUp ? false : "auto"}
            allowScrollButtonsMobile={!isMdUp}
            aria-label="Portfolio sections"
            sx={{
              minHeight: { xs: "56px", md: "70px" },
              overflowX: "auto",
              "& .MuiTab-root": {
                minWidth: { xs: 110, sm: 120, md: 0 },
                fontSize: { xs: "0.85rem", md: "1rem" },
                fontWeight: 600,
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.3s ease",
                padding: { xs: "10px 6px", md: "20px 0" },
                zIndex: 1,
                margin: { xs: "4px", md: "8px" },
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": { transform: "scale(1.1) rotate(5deg)" },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": { color: "#a78bfa" },
                },
              },
              "& .MuiTabs-indicator": { height: 0 },
              "& .MuiTabs-flexContainer": { gap: { xs: "4px", md: "8px" } },
              "& .MuiTabs-scrollButtons.Mui-disabled": { opacity: 0.3 },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              // {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
            <Tab
              icon={<Briefcase className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Experience"
              {...a11yProps(3)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={(index) => setValue(index)}
          enableMouseEvents
          resistance
          slideStyle={{
            padding: '0 10px',
            boxSizing: 'border-box',
            overflow: 'visible'
          }}
          containerStyle={{
            transition: 'transform 0.5s cubic-bezier(0.15, 0.4, 0.6, 0.85)'
          }}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                {displayedProjects && displayedProjects.map((project, index) => {
                  console.log('Rendering project:', { index, id: project.id, hasId: !!project.id });
                  return (
                    <div
                      key={project.id || index}
                      data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                      data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    >
                      <CardProject
                        Img={project.Img}
                        Title={project.Title}
                        Description={project.Description}
                        Link={project.Link}
                        id={project.id?.toString()} // Ensure ID is a string
                        isEighthProject={project.id === 8 || project.id === "8"} // Show Live Demo button only for the 8th project
                        LiveDemo={project.LiveDemo} // Pass the LiveDemo URL
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex flex-col justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {(showAllCertificates ? certificatesData.certificates : certificatesData.certificates.slice(0, initialItems)).map((certificate, index) => (
                  <div
                    key={certificate.id}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate ImgSertif={certificate.ImgSertif} />
                  </div>
                ))}
              </div>
            </div>
            {certificatesData.certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <div className="container mx-auto flex justify-start items-start overflow-hidden pb-[5%]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                {experiences.map((exp, index) => (
                  <article
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    className="group relative w-full h-full flex flex-col"
                  >
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20 h-full flex flex-col">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                      <div className="relative p-5 z-10 h-full flex flex-col">
                        <div className="relative overflow-hidden rounded-lg h-64 w-full mb-4 flex items-center justify-center bg-white/5">
                          <img src={exp.icon} alt={exp.company} className="h-full w-auto max-h-full object-contain" />
                        </div>
                        <div className="mt-4 space-y-3 flex-1 flex flex-col items-center text-center">
                          <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                            {exp.company}
                          </h3>
                          <div className="text-gray-300/90 text-sm">{exp.role}</div>
                          <div className="text-gray-400 text-xs">
                            {formatDate(exp.joiningDate) && (
                              <>
                                <span>Joining: {formatDate(exp.joiningDate)}</span>
                                <span> • </span>
                                <span>Exit: {formatDate(exp.exitDate) || 'Present'}</span>
                                <span> • </span>
                                <span>Total: {calcTenure(exp.joiningDate, exp.exitDate)}</span>
                              </>
                            )}
                            {!formatDate(exp.joiningDate) && exp.years && (
                              <span>Total: {exp.years}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50" />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}