import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id, isFifthProject, LiveDemo }) => {
  const handleDetails = (e) => {
    if (!id) {
      console.log("Project ID is missing");
      e.preventDefault();
      alert("Project details are not available");
    }
    // If ID exists, let the link work normally
  };
  

  return (
    <article className="group relative w-full h-full flex flex-col">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20 h-full flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
    
        <div className="relative p-5 z-10 h-full flex flex-col">
          <div className="relative overflow-hidden rounded-lg h-64 w-full mb-4">
            <img
              src={Img}
              alt={`Screenshot of ${Title} project`}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              style={{
                objectFit: 'cover',
                objectPosition: 'center center',
                minHeight: '100%',
                minWidth: '100%',
                maxHeight: '100%'
              }}
            />
          </div>
          
          <div className="mt-4 space-y-3 flex-1 flex flex-col">
            <header>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                {Title}
              </h3>
            </header>
            
            <div className="text-gray-300/80 text-sm leading-relaxed line-clamp-2 flex-1">
              {Description}
            </div>
            
            <div className="pt-4 flex items-center justify-between mt-auto">
              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-gray-500 text-sm">Details Not Available</span>
              )}
              
              {isFifthProject && LiveDemo && (
                <a
                  href={LiveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ml-auto"
                >
                  <span className="text-sm">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
          
          <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50" />
        </div>
      </div>
    </article>
  );
};

export default CardProject;