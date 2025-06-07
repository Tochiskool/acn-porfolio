import React from "react";
import ProjectDetails from "./ProjectDetails/ProjectDetails";
import "./project.css";
const Project = () => {
  const projectData = [
    {
      id: 1,
      name: "Zanolla Impianti Dashboard",
      image: "/projectImages/zanola.png",
      stack: "react vite|css3|ajax",
      skill: "Displaying Advance styleing techniques",
      link: "https://zanola-impianti-dashboard.vercel.app/",
    },
    {
      id: 2,
      name: "Van Life",
      image: "/projectImages/van.png",
      stack: "react vite|react-router-dom|css3|ajax",
      skill: "Advance routing, Protected routes etc",
      link: "https://shop-a-van.vercel.app/",
    },
    {
      id: 3,
      name: "Digital Support",
      image: "/projectImages/breath.png",
      stack: "react vite|css3|",
      skill: "Custom mobile first design technique with ",
      link: "https://pdas-psi.vercel.app/",
    },
  ];
  console.log(projectData);
  return (
    <div className='mainProjectContainer'>
      <h1>
        Check out my work-in-progress projects built with a mobile-first
        approach, responsive layouts, and scalable architecture.
      </h1>
      <div className='projectsContainer'>
        <ProjectDetails projects={projectData} />
      </div>
    </div>
  );
};

export default Project;
