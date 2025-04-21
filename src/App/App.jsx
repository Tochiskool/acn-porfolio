import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import "./app.css";

const careers = [
  "👋 Hey there! I'm a passionate developer who turns coffee into clean code.",
  "🚀 I love building interactive, efficient, and meaningful web experiences.",
  "🧠 Constant learner, problem solver, and fan of clever code patterns.",
  "💬 Let’s connect, collaborate, and create something awesome together!",
];

const App = () => {
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
      <header className='heroSection'>
        <div className='center overlayContent'>
          <h1>Welcome to my Official Portfolio</h1>
          <h3>A Christian N 🙈</h3>
        </div>
      </header>
      <hr />
      <main>
        <section className='mainContainer'>
          <div className='left'>
            <img
              className='imgOfChris'
              src='/assets/chris.jpeg'
              alt='Christian'
            />
          </div>
          <div className='right'>
            <h2 className='hero-subtitle'>{text}</h2>
          </div>
        </section>
        <article>
          <div className='btnContainer'>
            <div className='homeButton'>
              <Link to='/home' className='home-button'>
                Go to Home
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
};

export default App;
