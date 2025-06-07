import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import "./home.css";

const careers = [
  "👋 Hey there! I'm a passionate developer who turns coffee into clean code.",
  "🚀 I love building interactive, efficient, and meaningful web experiences.",
  "🧠 Constant learner, problem solver, and fan of clever code patterns.",
  "💬 Let’s connect, collaborate, and create something awesome together!",
];

const Home = () => {
  const [text, setText] = useState("");
  const [careerIndex, setCareerIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fade, setFade] = useState(true);

  const typingSpeed = 50;
  const pauseDuration = 1500;

  const timeoutRef = useRef(null);
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
        <div className='center'>
          <h1
            data-aos='fade-right'
            data-aos-offset='300'
            data-aos-easing='ease-in-sine'
          >
            When the drive is high, the expectation is overwhelming
          </h1>
          <h3 data-aos='zoom-in-up'>
            A Christian N <span id='smiley'>🙈</span>
          </h3>
        </div>
      </header>
      {/* <hr className='line' /> */}
      <main>
        <section className='mainContainer'>
          <div className='left'>
            <div className='imgOfChris'>
              <h1>Junior Javascript | React Engineer</h1>
              <p>Devoted self thought engineer</p>
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
