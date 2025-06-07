import React from "react";
import { Link } from "react-router-dom";
const ProjectDetails = ({ projects }) => {
  return (
    <>
      {projects.map((project) => {
        return (
          <div
            data-aos='fade-up'
            data-aos-anchor-placement='bottom-bottom'
            className='projectDetails'
            key={project.id}
          >
            <img src={project.image} alt={`Image of ${project.name}`} />
            <div className='projectContent'>
              <h4>
                {project.name}:{" "}
                <span className='spanning'>{project.stack}</span>
              </h4>
              <p>Summary: {project.skill}</p>
              <Link className='links' to={project.link}>
                checkout {project.name}
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProjectDetails;
