import React, { useState } from "react";
import Logo from "../images/logo.png";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser, setLoggedInUser } from "../utils";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = getLoggedInUser();

  return (
    <header className="w-full fixed z-10 bg-white opacity-90">
      <nav className="flex w-full py-2 md:py-3 px-4 md:px-20 items-center justify-between">
        <a
          href="/"
          className="flex items-center justify-center text-black text-lg cursor-pointer"
        >
          <img
            src={Logo}
            alt="Logo"
            className="hidden md:block w-4 h-4 lg:w-8 lg:h-8 mr-2"
          />
          Food<span>Wizard</span>
        </a>

        <ul className="hidden md:flex text-black gap-6">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/#recipes">Explore</a>
          </li>
          {user ? (
            <li>
              <a href="/favorites">Favorites</a>
            </li>
          ) : (
            <></>
          )}
        </ul>

        {!user ? (
          <Button
            title="Sign in"
            handleClick={() => {
              navigate("/login");
            }}
            conteinerStyle="hidden md:block bg-transparent border border-white text-white hover:bg-white hover:text-slate-700 rounded-full min-w-[130px]"
          />
        ) : (
          <Button
            title="Logout"
            handleClick={() => {
              setLoggedInUser(null);
              navigate("/login");
            }}
            conteinerStyle="hidden md:block bg-transparent border border-white text-white hover:bg-white hover:text-slate-700 rounded-full min-w-[130px]"
          />
        )}

        <button
          className="block md:hidden text-black text-xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <AiOutlineClose /> : <HiMenuAlt3 />}
        </button>
      </nav>
      <div
        className={`${
          open ? "flex" : "hidden"
        } bg-white flex-col w-full px-4 pt-16 pb-10 text-black gap-6 text-[14px]`}
      >
        <a href="/">Home</a>
        <a href="/#recipes">Recipes</a>
        <a href="/">Favorites</a>
      </div>
    </header>
  );
};

export default Navbar;
