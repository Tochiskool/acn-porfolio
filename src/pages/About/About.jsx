import React from 'react';
import './about.css';

const About = () => {
  return (
    <section className="aboutSection">
      <div className="aboutContainer">
        <div className="aboutIntro">
          <h1 className="extra-big-heading" data-aos="fade-right">
            Ciao!! It's Me
          </h1>

          <h1 className="normal-big" data-aos="fade-left">
            A Christian Ndifor
          </h1>
        </div>

        <div className="aboutBadge" data-aos="zoom-in">
          <span>Software Engineer</span>
          <span>MERN Stack Developer</span>
          <span>Data Analyst Power Bi Desktop/Excel</span>
        </div>
      </div>

      <div
        className="aboutContentCard"
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        <p className="paraAboutEl">
          <span className="normal-big aboutStart">Hey there!</span> I’m
          Christian — a results-driven Software Engineer with a strong passion
          for building clean, scalable, and business-focused digital products.
          My journey into software has been shaped by consistency, discipline,
          and a hands-on approach to solving real problems through technology.
        </p>

        <p className="paraAboutEl">
          I specialize in full-stack web development using the MERN stack,
          building responsive interfaces, REST APIs, authentication systems,
          dashboards, and database-driven applications. I enjoy transforming
          ideas into professional products that are not only visually strong,
          but also structured, reliable, and ready to grow.
        </p>

        <p className="paraAboutEl">
          Beyond software development, I bring solid competence in Excel, Power
          BI, data management, reporting, and business analysis. This gives me a
          unique advantage: I do not only build applications — I understand how
          data, workflows, users, and business decisions connect together.
        </p>

        <p className="paraAboutEl">
          My background has taught me resilience, precision, and accountability.
          Every project I build reflects my commitment to continuous learning,
          clean execution, mobile-first design, and professional delivery. I am
          growing every day, but I work with the mindset of someone building for
          long-term impact.
        </p>
      </div>
    </section>
  );
};

export default About;
