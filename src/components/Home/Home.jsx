import React from "react";
import Header from "../Header/Header";

const Home = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <section class='background-secondary'>
          <div class='container'>Hero Primary Content</div>
        </section>
        <section>
          <div class='container'>Image and Text Content</div>
        </section>
        <section class='background-primary'>
          <div class='container'>Testimonial Content</div>
        </section>
        <section class='background-secondary'>
          <div class='container'>Media Objects</div>
        </section>
        <section class='background-tertiary'>
          <div class='container'>More Content</div>
        </section>
      </main>
      <footer class='background-primary'>
        <div class='container'>Footer Content</div>
      </footer>
    </>
  );
};

export default Home;
