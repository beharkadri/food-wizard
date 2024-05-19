import React from "react";
import Header from "../components/Header";
import Recipes from "../components/Recipes";

const Home = () => {
  return (
    <main className="w-full flex flex-col bg-white">
      <Header
        title={<p>Explore our huge selection of delicious recipe ideas.</p>}
        type="home"
      />

      <section id="recipes" className="md:max-w-[1440px] mx-auto px-4 md:px-20">
        <Recipes />
      </section>
    </main>
  );
};

export default Home;
