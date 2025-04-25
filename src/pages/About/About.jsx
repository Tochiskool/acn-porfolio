import React from "react";
import "./about.css";

const About = () => {
  return (
    <>
      <div className='aboutContainer'>
        <h1 className='extra-big-heading' data-aos='fade-right'>
          Ciao!! It's Me
        </h1>
        <h1 className='normal-big' data-aos='fade-left'>
          A Christian Ndifor
        </h1>
      </div>

      <p
        className='paraAboutEl'
        data-aos='flip-left'
        data-aos-easing='ease-out-cubic'
        data-aos-duration='2000'
      >
        <span className='normal-big'>Hey there!</span> I'm Christian — a
        passionate junior Software Engineer focused on building clean, scalable,
        and responsive full-stack web apps (MERN, SQL). While I’m still growing
        my experience, I consistently deliver reliable results on time. Over the
        past five years, I’ve been honing my skills through hands-on projects,
        peer collaboration, and coursework from platforms like edX and Udemy —
        including material from top universities. I'm committed to continuous
        learning and always staying up to date with the latest in tech.
      </p>
    </>
  );
};

export default About;
