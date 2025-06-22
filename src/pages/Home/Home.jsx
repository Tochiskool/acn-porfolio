import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import "./home.css";
import { useTheme } from "../../components/UseTheme/useTheme";
import img1 from "/assets/christian.jpeg";
import img2 from "/assets/worker.jpg";
import img3 from "/assets/father.jpg";
import img4 from "/assets/books.jpeg";

const careers = [
  "👋 Hey there! I'm a passionate developer who turns coffee into clean code.",
  "🚀 I love building interactive, efficient, and meaningful web experiences.",
  "🧠 Constant learner, problem solver, and fan of clever code patterns.",
  "💬 Let’s connect, collaborate, and create something awesome together!",
];

const Home = () => {  
  const { isDarkMode } = useTheme();
  const [text, setText] = useState("");
  const [careerIndex, setCareerIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fade, setFade] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(null);

  const images = [img1, img2, img3, img4];
  const typingSpeed = 50;
  const pauseDuration = 1500;

  const timeoutRef = useRef(null);

  // Image slider every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousImageIndex(currentImageIndex);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);


  useEffect(() => {
    if (isPaused) return;

    if (charIndex < careers[careerIndex].length) {
      timeoutRef.current = setTimeout(() => {
        setText((prev) => prev + careers[careerIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else {
      // Done typing current line
      setIsPaused(true);
      timeoutRef.current = setTimeout(() => {
        // Move to next career line
        setIsPaused(false);
        setCharIndex(0);
        setText("");
        setCareerIndex((prev) => (prev + 1) % careers.length);
        setFade(true);
      }, pauseDuration);
    }

    // This is the key fix: add careerIndex as a dependency 👇
  }, [charIndex, isPaused, careerIndex]);
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);
  return (
    <>
      <header>
        <div className={`center ${isDarkMode ? "dark": "light"}`}>
          <h1
            data-aos='fade-right'
            data-aos-offset='300'
            data-aos-easing='ease-in-sine'
          >
            When the drive is high, the result is overwhelming
          </h1>
          <h3 data-aos='zoom-in-up'>
            A Christian N <span id='smiley'>🥋</span>
          </h3>
        </div>
      </header>
      {/* <hr className='line' /> */}
      <main>
        <section data-aos="zoom-out-down"  className='mainContainer' style={{ background: `url(${images[currentImageIndex]}) center/cover no-repeat`,}}>
                {/* Background Layers */}
                {previousImageIndex !== null && (
            <div
              className='backgroundImage'
              style={{
                backgroundImage: `url(${images[previousImageIndex]})`,
                opacity: 0,
              }}
            ></div>
          )}
          <div
            className='backgroundImage'
            style={{
              backgroundImage: `url(${images[currentImageIndex]})`,
              opacity: 1,
            }}
          ></div>
          <div className='left'>
            <div className='imgOfChris'>
              <h1>Junior Javascript | React Engineer | MERN STACK</h1>
              <p>Devoted Software engineer</p>
            </div>
          </div>
          <div className='right'>
            <div className='typingWrapper'>
              <div className={`typingText ${!fade ? "hidden" : ""}`}>
                <h2 className='hero-subtitle'>{text}</h2>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
