import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AOS from "aos";
import useMediaQuery from "@mui/material/useMediaQuery";
import "aos/dist/aos.css";
import { Trophy, Award, Target } from "lucide-react";
import codingChallengesData from "../data/coding-challenges.json";
import achievementBadgesData from "../data/achievement-badges.json";



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

export default function Achievement() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const categories = ["All", "Coding Challenges", "Achievements"];

  const getAchievementsForCategory = (categoryIndex) => {
    if (categoryIndex === 0) {
      // All achievements
      return [
        ...codingChallengesData.codingChallenges,
        ...achievementBadgesData.achievementBadges
      ];
    } else if (categoryIndex === 1) {
      // Coding Challenges
      return codingChallengesData.codingChallenges;
    } else if (categoryIndex === 2) {
      // Achievements
      return achievementBadgesData.achievementBadges;
    }
    return [];
  };

  const filteredAchievements = getAchievementsForCategory(value);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Achievement">
      {/* Header section */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Achievements
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Showcasing my accomplishments and milestones in coding and problem-solving.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
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
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant={isMdUp ? "fullWidth" : "scrollable"}
            scrollButtons={isMdUp ? false : "auto"}
            allowScrollButtonsMobile={!isMdUp}
            aria-label="Achievement categories"
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
              icon={<Trophy className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="All"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Target className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Coding Challenges"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Achievements"
              {...a11yProps(2)}
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
          {categories.map((category, index) => (
            <TabPanel key={index} value={value} index={index} dir={theme.direction}>
              <div className="container mx-auto flex justify-center items-center overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredAchievements.map((achievement, achIndex) => (
                    <div
                      key={achievement.id}
                      data-aos={achIndex % 3 === 0 ? "fade-up-right" : achIndex % 3 === 1 ? "fade-up" : "fade-up-left"}
                      data-aos-duration={achIndex % 3 === 0 ? "1000" : achIndex % 3 === 1 ? "1200" : "1000"}
                    >
                      <article className="group relative w-full h-full flex flex-col">
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20 h-full flex flex-col">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                          <div className="relative z-10 h-full flex flex-col">
                            {achievement.ImgSertif ? (
                              // Full certificate image covering the entire card
                              <div className="relative overflow-hidden rounded-xl h-full w-full flex items-center justify-center">
                                <img 
                                  src={achievement.ImgSertif} 
                                  alt={`Certificate ${achievement.id}`}
                                  className="h-full w-full object-cover" 
                                />
                              </div>
                            ) : (
                              // Standard achievement card
                              <>
                                <div className="relative overflow-hidden rounded-lg h-32 w-full mb-4 flex items-center justify-center bg-white/5 p-5">
                                  <img src={achievement.icon} alt={achievement.title} className="h-full w-auto max-h-full object-contain" />
                                </div>
                                <div className="p-5 flex-1 flex flex-col items-center text-center">
                                  <div className="mt-4 space-y-3 flex-1 flex flex-col items-center text-center">
                                    <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                                      {achievement.title}
                                    </h3>
                                    <p className="text-gray-300/90 text-sm">{achievement.description}</p>
                                    {achievement.stats && (
                                      <div className="text-gray-400 text-xs">
                                        {Object.entries(achievement.stats).map(([key, value]) => (
                                          <span key={key}>{key}: {value} </span>
                                        ))}
                                      </div>
                                    )}
                                    {achievement.badges && (
                                      <div className="text-gray-400 text-xs">
                                        Badges: {achievement.badges.join(', ')}
                                      </div>
                                    )}
                                    {achievement.link && (
                                      <a
                                        href={achievement.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors"
                                      >
                                        View on LeetCode
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                          <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50" />
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>
          ))}
        </SwipeableViews>
      </Box>
    </div>
  );
}