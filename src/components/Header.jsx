import React from "react";
import { Banner1, Banner2, Banner3, Banner4, Banner5 } from "../images";
import { BiPlayCircle } from "react-icons/bi";

const images = [Banner1, Banner2, Banner3, Banner4, Banner5];

const Header = ({ title, image, type }) => {
  return (
    <div className="w-full h-[100vh]">
      <div className="relative w-full h-full bg-transparent">
        <img
          src={image ?? images[Math.floor(Math.random() * images.length)]}
          alt="Hero"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute w-full h-full bg-gradient-to-t from-black to-transparent top-0 z-8 flex flex-col items-center justify-center pt-40 2xl:pt-20 px-4 ">
        <h1 className="text-white text-4xl md:text-5xl font-bold text-center">
          {title}
        </h1>
        {type === "detail" ? (
          <a
            href="https://youtu.be/E_eQWp70ZM0"
            target="_blank"
            rel="noreferrer"
            referrerPolicy="no-referrer"
            className="bg-[#912218] flex gap-2 items-center justify-center rounded-full p-2 mt-4 text-lg text-white"
          >
            <span>Watch instruction video</span>
            <BiPlayCircle />
          </a>
        ) : (
          <></>
        )}
        {type === "home" && (
          <p className="text-sm mt-4 text-center text-white bg-[#00000090] px-6 py-4 rounded-full ">
            Welcome to FoodWizard, your passport to culinary adventures!
            <br className="hidden md:block" /> Discover a treasure trove of
            delectable recipes from around the globe.
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;
