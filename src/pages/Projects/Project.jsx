import React from 'react';
import ProjectDetails from './ProjectDetails/ProjectDetails';
import './project.css';

const Project = () => {
  const projectData = [
    {
      id: 1,
      name: 'CAJLINKERS Logistics & Marketplace',
      image: '/projectImages/cajLinkers.png',
      stack: 'MERN Stack App',
      skill: 'React, Node.js, REST APIs, JWT Auth, MongoDB',
      link: 'https://cajlinkersb2b.vercel.app/',
    },
    {
      id: 2,
      name: 'Zanolla Impianti Dashboard',
      image: '/projectImages/zanola.png',
      stack: 'React Vite | CSS3 | AJAX',
      skill: 'Business dashboard with clean UI and responsive data display.',
      link: 'https://zanola-impianti-dashboard.vercel.app/',
    },
    {
      id: 3,
      name: 'Ace Health Care Solution',
      image: '/projectImages/nelo.png',
      stack: 'React | Express | CSS3 | Node | MongoDB',
      skill: 'Mobile-first healthcare website with scalable structure.',
      link: 'https://acehealthcaresolution.org/',
    },
    {
      id: 4,
      name: 'Online Ecommerce Shop',
      image: '/projectImages/ecom.png',
      stack: 'React | Express | CSS3 | Node | MongoDB',
      skill: 'Mobile-first ecommerce web application. Work in progress.',
      link: 'https://tlinker-frontend.vercel.app/',
    },
  ];

  return (
    <section className="mainProjectContainer">
      <div className="projectHero">
        <span className="projectEyebrow">Selected Work</span>

        <h1>
          Building modern, scalable, and business-focused digital products.
        </h1>

        <p>
          A collection of responsive web applications built with strong frontend
          structure, backend logic, authentication, APIs, and mobile-first
          design.
        </p>

        <h2>Project count: {projectData.length}</h2>
      </div>

      <div className="projectsContainer">
        <ProjectDetails projects={projectData} />
      </div>
    </section>
  );
};

export default Project;
