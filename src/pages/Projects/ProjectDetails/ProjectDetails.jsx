import React from 'react';

const ProjectDetails = ({ projects, featured = false }) => {
  return (
    <>
      {projects.map((project) => (
        <article
          className={`projectDetails ${featured ? 'featuredProject' : ''}`}
          key={project.id}
        >
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="projectImageLink"
            aria-label={`Visit ${project.name}`}
          >
            <img
              src={project.image}
              alt={`${project.name} application screenshot`}
              loading="lazy"
            />
            <span className="imageArrow" aria-hidden="true">
              ↗
            </span>
          </a>

          <div className="projectContent">
            <div className="projectTopline">
              <span className="projectCategory">{project.category}</span>

              {project.status && (
                <span className="projectStatus">{project.status}</span>
              )}
            </div>

            <h3>{project.name}</h3>

            <p className="projectDescription">{project.description}</p>

            <div className="technologyList" aria-label="Technologies used">
              {project.technologies.map((technology) => (
                <span className="technologyTag" key={technology}>
                  {technology}
                </span>
              ))}
            </div>

            <a
              className="projectVisitLink"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit live project
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      ))}
    </>
  );
};

export default ProjectDetails;
