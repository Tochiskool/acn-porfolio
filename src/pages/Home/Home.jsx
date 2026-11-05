
import React, { useState, useEffect } from 'react';
import './home.css';
import { useTheme } from '../../components/UseTheme/useTheme';

import portrait from '/assets/christian.jpeg';

const specialties = [
  'Full-Stack Development',
  'React & Modern Frontend Engineering',
  'Node.js, Express & MongoDB',
  'Business Intelligence & Analytics',
  'Building Real-World Digital Products',
];

const expertise = [
  {
    number: '01',
    title: 'Frontend',
    detail: 'React · JavaScript · CSS',
  },
  {
    number: '02',
    title: 'Backend',
    detail: 'Node.js · Express · MongoDB',
  },
  {
    number: '03',
    title: 'Data',
    detail: 'Power BI · Excel · Analytics',
  },
];

const Home = () => {
  const { isDarkMode } = useTheme();

  const [specialtyIndex, setSpecialtyIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = specialties[specialtyIndex];

    const delay =
      !isDeleting && charIndex === current.length
        ? 2200
        : isDeleting
        ? 35
        : 65;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < current.length) {
        setCharIndex((prev) => prev + 1);
      } else if (!isDeleting) {
        setIsDeleting(true);
      } else if (charIndex > 0) {
        setCharIndex((prev) => prev - 1);
      } else {
        setIsDeleting(false);
        setSpecialtyIndex(
          (prev) => (prev + 1) % specialties.length
        );
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [charIndex, specialtyIndex, isDeleting]);

  return (
    <main
      className={`portfolioHome ${
        isDarkMode ? 'portfolioDark' : 'portfolioLight'
      }`}
    >
      <section className="portfolioHero">
        <div className="heroContent">
          <p className="heroEyebrow">
            <span className="statusDot" aria-hidden="true" />
            SOFTWARE ENGINEER / FULL-STACK DEVELOPER
          </p>

          <h1>
            Building software
            <br />
            that <span>solves real problems.</span>
          </h1>

          <p className="heroDescription">
            I'm Christian Ndifor, a full-stack developer
            specializing in React, Node.js, Express, and
            MongoDB. I turn complex business requirements
            into thoughtful, functional digital products.
          </p>

          <div className="heroTyping">
            <span className="typingLabel">
              I SPECIALIZE IN
            </span>

            <div className="typingLine" aria-hidden="true">
              <span>
                {specialties[specialtyIndex].slice(0, charIndex)}
              </span>
              <span className="typingCursor" />
            </div>
          </div>

          <div className="heroActions">
            <a href="/projects" className="primaryAction">
              View selected work
              <span aria-hidden="true">↗</span>
            </a>

            <a href="#contact" className="secondaryAction">
              Get in touch
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="heroMeta">
            <span>BASED IN ITALY</span>
            <span>FULL-STACK ENGINEERING</span>
            <span>PRODUCT & DATA</span>
          </div>
        </div>

        <div className="heroVisual">
          <div className="portraitFrame">
            <img
              src={portrait}
              alt="Christian Ndifor"
              fetchPriority="high"
            />
          </div>

          <div className="portraitCaption">
            <span>CHRISTIAN NDIFOR</span>
            <span>ENGINEER / BUILDER</span>
          </div>
        </div>
      </section>

      <section
        className="expertiseSection"
        aria-labelledby="expertiseTitle"
      >
        <div className="expertiseIntro">
          <p className="sectionEyebrow">
            WHAT I WORK WITH
          </p>

          <h2 id="expertiseTitle">
            Engineering meets business thinking.
          </h2>
        </div>

        <div className="expertiseGrid">
          {expertise.map((item) => (
            <article
              className="expertiseItem"
              key={item.number}
            >
              <span className="expertiseNumber">
                {item.number}
              </span>

              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contactStrip" id="contact">
        <div>
          <p className="sectionEyebrow">
            LET'S CONNECT
          </p>

          <h2>
            Have a project or opportunity in mind?
          </h2>
        </div>

        <a
          href="https://www.linkedin.com/in/christian-n-awemu-6553491b9/"
          target="_blank"
          rel="noopener noreferrer"
          className="contactAction"
        >
          Connect on LinkedIn
          <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
};

export default Home;
