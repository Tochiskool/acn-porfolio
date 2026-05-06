import React from 'react';
import './skills.css';

const Skills = () => {
  const icons = [
    {
      image: '/assets/skills/1react.png',
      title: 'React',
      description: 'Modern frontend development and scalable UI architecture.',
    },
    {
      image: '/assets/skills/2mongo.png',
      title: 'MongoDB',
      description: 'Database design, schema structure, and data management.',
    },
    {
      image: '/assets/skills/4mysql.png',
      title: 'MySQL',
      description:
        'Relational databases, SQL queries, and backend integration.',
    },
    {
      image: '/assets/skills/5express.png',
      title: 'Express.js',
      description: 'REST APIs, middleware, authentication, and server logic.',
    },
    {
      image: '/assets/skills/6node.png',
      title: 'Node.js',
      description: 'Backend development and scalable server-side applications.',
    },
    {
      image: '/assets/skills/git.png',
      title: 'Git & GitHub',
      description: 'Version control, collaboration, and deployment workflow.',
    },
    {
      image: '/assets/skills/07redux.jpeg',
      title: 'Redux',
      description: 'State management for scalable frontend applications.',
    },
    {
      image: '/assets/skills/08-tailwindcss-logo.png',
      title: 'Tailwind CSS',
      description: 'Responsive utility-first UI styling and design systems.',
    },
    {
      image: '/assets/skills/figma.png',
      title: 'Figma',
      description: 'UI/UX design collaboration and interface prototyping.',
    },
    {
      image: '/assets/skills/workbench.webp',
      title: 'Workbench & SQL',
      description:
        'Data analysis, SQL implementation, and reporting workflows.',
    },
  ];

  return (
    <section className="skillContainer">
      <div className="skillsHero">
        <span className="skillsEyebrow">Technical Expertise</span>

        <h1>Skills Overview</h1>

        <h4>
          A combination of software engineering, backend architecture,
          responsive UI development, databases, analytics, and modern developer
          tools.
        </h4>
      </div>

      <div className="skillsGrid">
        {icons.map((icon, index) => (
          <div data-aos="zoom-in" className="skillCard" key={index}>
            <div className="skillImageWrapper">
              <img src={icon.image} alt={icon.title} />
            </div>

            <div className="skillContent">
              <h3>{icon.title}</h3>
              <p>{icon.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
