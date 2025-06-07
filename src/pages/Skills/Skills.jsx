import React, { useState } from "react";
import "./skills.css";
const Skills = () => {
  const [icons, setIcons] = useState([
    "/assets/skills/1react.png",
    "/assets/skills/2mongo.png",
    "/assets/skills/4mysql.png",
    "/assets/skills/5express.png",
    "/assets/skills/6node.png",
    "/assets/skills/git.png",
    "/assets/skills/07redux.jpeg",
    "/assets/skills/08-tailwindcss-logo.png",
    "/assets/skills/figma.png",
    "/assets/skills/workbench.webp",
  ]);

  const displayIcons = icons.map((icon, index) => (
    <li key={index}>
      <img src={icon} alt={`Skill ${index + 1}`} />
    </li>
  ));
  return (
    <div className='skillContainer'>
      <h1>Skills Overview</h1>
      <h4>
        Here are a list of tools, libraries and platforms I have had previous
        experience on.
      </h4>
      <ul>{displayIcons}</ul>
    </div>
  );
};

export default Skills;
