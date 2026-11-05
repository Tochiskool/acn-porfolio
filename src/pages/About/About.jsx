import React from 'react';
import { useTheme } from '../../components/UseTheme/useTheme';
import './about.css';

const capabilities = [
  {
    number: '01',
    title: 'Software Engineering',
    description:
      'Building full-stack applications with React, Node.js, Express, MongoDB, REST APIs, and authentication systems.',
  },
  {
    number: '02',
    title: 'Data & Business Intelligence',
    description:
      'Working with Power BI, Excel, reporting, dashboards, and data-driven business analysis.',
  },
  {
    number: '03',
    title: 'Industry & Operations',
    description:
      'Applying practical experience in industrial operations, logistics, and business workflows to software development.',
  },
];

const About = () => {
  const { isDarkMode } = useTheme();

  return (
    <main className={`aboutPage ${isDarkMode ? 'aboutDark' : 'aboutLight'}`}>
      <div className="aboutSection">
        <header className="aboutHero">
          <div className="aboutHeroContent">
            <p className="aboutEyebrow">ABOUT / CHRISTIAN NDIFOR</p>

            <h1>
              An engineer's mindset.
              <br />
              <span>A builder's approach.</span>
            </h1>

            <p className="aboutLead">
              I'm Christian Ndifor, a full-stack developer with a
              multidisciplinary background spanning software engineering, data
              analytics, business operations, and industrial engineering.
            </p>

            <div className="aboutIdentity">
              <span>FULL-STACK DEVELOPMENT</span>
              <span>DATA & ANALYTICS</span>
              <span>BUSINESS & OPERATIONS</span>
            </div>
          </div>

          <div className="aboutSideNote">
            <span className="aboutSideNumber">01 / ABOUT ME</span>
            <p>
              I believe great software starts with understanding real problems,
              the people experiencing them, and the systems behind them.
            </p>
          </div>
        </header>

        <section className="aboutStory" aria-labelledby="aboutStoryTitle">
          <div className="aboutSectionLabel">
            <span>MY STORY</span>
            <span className="aboutLabelLine" />
          </div>

          <div className="aboutStoryContent">
            <h2 id="aboutStoryTitle">
              From hands-on problem solving to building digital products.
            </h2>

            <p>
              My professional journey began outside the traditional software
              industry. Working in technical and industrial environments taught
              me the value of precision, discipline, accountability, and solving
              problems under real-world constraints.
            </p>

            <p>
              That experience shaped the way I approach software engineering
              today. I don't just think about how an application looks. I think
              about how it works, how users interact with it, how information
              moves through the system, and how it supports business operations.
            </p>

            <p>
              I specialize in the MERN stack, developing responsive React
              interfaces, Node.js and Express APIs, MongoDB-backed applications,
              authentication workflows, and business-focused digital platforms.
            </p>

            <p>
              My background in Excel, Power BI, reporting, and logistics adds
              another dimension to my work. It helps me connect software
              architecture with operational requirements, data, and
              decision-making.
            </p>

            <p>
              I continue to strengthen my engineering skills through practical
              development, computer science fundamentals, and building real
              applications. My goal is to create software that is useful,
              maintainable, and designed for long-term value.
            </p>
          </div>
        </section>

        <section
          className="aboutCapabilities"
          aria-labelledby="aboutCapabilitiesTitle"
        >
          <div className="aboutCapabilitiesHeader">
            <p className="aboutEyebrow">WHAT I BRING</p>
            <h2 id="aboutCapabilitiesTitle">
              More than code.
              <br />A broader perspective.
            </h2>
          </div>

          <div className="aboutCapabilitiesGrid">
            {capabilities.map((item) => (
              <article className="aboutCapability" key={item.number}>
                <span className="aboutCapabilityNumber">{item.number}</span>

                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="aboutClosing">
          <div>
            <p className="aboutEyebrow">WHAT DRIVES ME</p>

            <h2>
              Build thoughtfully.
              <br />
              Learn continuously.
              <br />
              Deliver with purpose.
            </h2>
          </div>

          <a
            href="https://www.linkedin.com/in/christian-n-awemu-6553491b9/"
            target="_blank"
            rel="noopener noreferrer"
            className="aboutContactLink"
          >
            Connect with me
            <span aria-hidden="true">↗</span>
          </a>
        </section>
      </div>
    </main>
  );
};

export default About;
