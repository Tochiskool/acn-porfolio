import React from "react";
import { Link } from "react-router-dom";
const ProjectDetails = ({ projects }) => {
  return (
    <>
      {projects.map((project) => {
        return (
          <div className='projectDetails' key={project.id}>
            <img src={project.image} alt={`Image of ${project.name}`} />
            <h4>
              {project.name}: <span>{project.stack}</span>
            </h4>
            <p>Summary:{project.skill}</p>
            <Link to={project.link}>checkour {project.name}</Link>
          </div>
        );
      })}
    </>
  );
};

export default ProjectDetails;
