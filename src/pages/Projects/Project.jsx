import React from 'react';
import ProjectDetails from './ProjectDetails/ProjectDetails';
import { useTheme } from '../../components/UseTheme/useTheme';
import './project.css';

const projectData = [
  {
    id: 1,
    name: 'CAJLINKERS',
    category: 'B2B Marketplace & Logistics Platform',
    image: '/projectImages/cajLinkers.png',
    description:
      'A B2B marketplace connecting buyers, suppliers, and freight forwarders. Built around business verification, marketplace workflows, payment integration, and shipment coordination.',
    technologies: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Stripe',
      'REST APIs',
    ],
    link: 'https://cajlinkers.com/',
    featured: true,
  },
  {
    id: 2,
    name: 'Ace Health Care Solution',
    category: 'Healthcare Web Platform',
    image: '/projectImages/nelo.png',
    description:
      'A responsive healthcare website designed to present services clearly and provide an accessible experience across desktop and mobile devices.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'CSS3'],
    link: 'https://acehealthcaresolution.org/',
  },
  {
    id: 3,
    name: 'Kamiral Chemicals',
    category: 'E-commerce Application',
    image: '/projectImages/KamiraChemicals.png',
    description:
      'A mobile-first e-commerce web application focused on product presentation, responsive layouts, and a structured shopping experience. Development in progress.',
    technologies: ['React', 'Express', 'Node.js', 'MongoDB', 'CSS3'],
    link: 'https://kamirachemicals-ehku.vercel.app/',
    status: 'In development',
  },
  {
    id: 4,
    name: 'Nevio Bole',
    category: 'Web Application',
    image: '/projectImages/nevio.png',
    description:
      'A responsive full-stack web application built with a modern JavaScript stack, focusing on maintainable components, backend integration, and mobile usability.',
    technologies: ['React', 'Express', 'Node.js', 'MongoDB', 'CSS3'],
    link: 'https://nevio-bole.vercel.app/',
  },
];

const Project = () => {
  const { isDarkMode } = useTheme();

  const featuredProject = projectData.find((project) => project.featured);

  const otherProjects = projectData.filter((project) => !project.featured);

  return (
    <main
      className={`projectPage ${isDarkMode ? 'projectDark' : 'projectLight'}`}
    >
      <div className="mainProjectContainer">
        <header className="projectHero">
          <div className="projectHeroIntro">
            <span className="projectEyebrow">PORTFOLIO / SELECTED WORK</span>

            <h1>
              Selected work.
              <br />
              <span>Real products.</span>
            </h1>

            <p>
              A collection of web applications and digital products I've built
              using modern frontend, backend, and database technologies. Each
              project represents practical engineering, problem-solving, and
              product development.
            </p>
          </div>

          <div className="projectHeroMeta">
            <span className="projectCount">
              {String(projectData.length).padStart(2, '0')}
            </span>
            <span>SELECTED PROJECTS</span>
          </div>
        </header>

        {featuredProject && (
          <section className="featuredSection" aria-labelledby="featuredTitle">
            <div className="sectionHeading">
              <h2 id="featuredTitle">Featured project</h2>
              <span>01 / FEATURED WORK</span>
            </div>

            <ProjectDetails projects={[featuredProject]} featured />
          </section>
        )}

        <section
          className="otherProjectsSection"
          aria-labelledby="otherProjectsTitle"
        >
          <div className="sectionHeading">
            <h2 id="otherProjectsTitle">More projects</h2>
            <span>ADDITIONAL WORK</span>
          </div>

          <div className="projectsContainer">
            <ProjectDetails projects={otherProjects} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Project;
