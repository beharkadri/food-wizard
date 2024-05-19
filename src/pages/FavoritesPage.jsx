import React from "react";
import Header from "../components/Header";
import Favorites from "../components/Favorites";

const FavoritesPage = () => {
  return (
    <main className="w-full flex flex-col bg-white">
      <Header title={<p>Your favorite recipes.</p>} type="Favorites" />

      <section id="recipes" className="md:max-w-[1440px] mx-auto px-4 md:px-20">
        <Favorites />
      </section>
    </main>
  );
};

export default FavoritesPage;
