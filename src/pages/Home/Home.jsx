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
      }, pauseDuration);
    }

    // This is the key fix: add careerIndex as a dependency 👇
  }, [charIndex, isPaused, careerIndex]);

  return (
    <>
      <header>
        <div className='center'>
          <h1>Welcome to my Official Portfolio</h1>
          <h3>
            A Christian N <span id='smiley'>🙈</span>
          </h3>
        </div>
      </header>
      <hr className='line' />
      <main>
        <section className='mainContainer'>
          <div className='left'>
            <div className='imgOfChris'>
              <h1>Junior Javascript | React Engineer</h1>
              <p>Devoted self thought engineer</p>
            </div>
          </div>
          <div className='right'>
            <h4 className='hero-subtitle'>{text}</h4>
          </div>
        </section>
        <article>
          {/* <div className='btnContainer'>
            <div className='homeButton'>
              <Link to='/home' className='home-button'>
                Go to Home
              </Link>
            </div>
          </div> */}
        </article>
      </main>
    </>
  );
};

export default Home;
