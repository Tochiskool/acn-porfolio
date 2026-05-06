import React, { useState, useEffect, useRef } from 'react';
import './home.css';
import { useTheme } from '../../components/UseTheme/useTheme';

import img1 from '/assets/christian.jpeg';
import img2 from '/assets/worker.jpg';
import img3 from '/assets/father.jpg';
import img4 from '/assets/books.jpeg';

const careers = [
  "👋 Hey there! I'm Christian — a software engineer who turns ideas into clean, useful digital products.",
  '🚀 I build responsive web applications with React, Node.js, MongoDB, APIs, authentication, and strong frontend structure.',
  '📊 I also work with Excel, Power BI, dashboards, reporting, and data-driven business thinking.',
  '🧠 My journey is built on discipline, problem-solving, continuous learning, and professional execution.',
];

const images = [img1, img2, img3, img4];

const Home = () => {
  const { isDarkMode } = useTheme();

  const [text, setText] = useState('');
  const [careerIndex, setCareerIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(null);

  const timeoutRef = useRef(null);

  const typingSpeed = 45;
  const pauseDuration = 1800;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        setPreviousImageIndex(prevIndex);
        return (prevIndex + 1) % images.length;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const currentCareer = careers[careerIndex];

    if (charIndex < currentCareer.length) {
      timeoutRef.current = setTimeout(() => {
        setText((prev) => prev + currentCareer[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else {
      setIsPaused(true);

      timeoutRef.current = setTimeout(() => {
        setText('');
        setCharIndex(0);
        setCareerIndex((prev) => (prev + 1) % careers.length);
        setIsPaused(false);
      }, pauseDuration);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [charIndex, careerIndex, isPaused]);

  return (
    <>
      <header className="homeHeader">
        <div className={`center ${isDarkMode ? 'dark' : 'light'}`}>
          <span className="homeEyebrow">Portfolio of A Christian Ndifor</span>

          <h1
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            When the drive is high, the result is overwhelming
          </h1>

          <h3 data-aos="zoom-in-up">
            A Christian N <span id="smiley">🥋</span>
          </h3>
        </div>
      </header>

      <main>
        <section data-aos="zoom-out-down" className="mainContainer">
          {previousImageIndex !== null && (
            <div
              className="backgroundImage previousImage"
              style={{
                backgroundImage: `url(${images[previousImageIndex]})`,
              }}
            />
          )}

          <div
            className="backgroundImage activeImage"
            style={{
              backgroundImage: `url(${images[currentImageIndex]})`,
            }}
          />

          <div className="heroOverlay"></div>

          <div className="left">
            <div className="imgOfChris">
              <span className="heroBadge">MERN Stack Developer</span>

              <h1>Software Engineer | React Developer | Data-Minded Builder</h1>

              <p>
                Building clean interfaces, scalable applications, business
                dashboards, and digital products with purpose.
              </p>
            </div>
          </div>

          <div className="right">
            <div className="typingWrapper">
              <div className="typingText">
                <h2 className="hero-subtitle">{text}</h2>
                <span className="typingCursor">|</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
