import React, { isValidElement, useState } from "react";
import { HiHeart } from "react-icons/hi";
import { Link } from "react-router-dom";
import { addRemoveFavorite, getLoggedInUser, isFavorite } from "../utils";
import toast from "react-hot-toast";

const RecipeCard = ({ onFavoriteToggle, recipe }) => {
  const { image, label, cuisineType, mealType, uri } = recipe?.recipe;
  const [favorite, setFavorite] = useState(isFavorite(uri));
  const id = uri?.split("#")[1];

  const user = getLoggedInUser();

  const handleFavorite = () => {
    const res = addRemoveFavorite(recipe.recipe);
    if (res) {
      toast.success(label + " added to favorites");
    } else {
      toast.success(label + " removed from favorites");
    }
    setFavorite(res);
    onFavoriteToggle?.();
  };

  return (
    <div className="w-full md:w-[220px] bg-_gradient shadow rounded-lg relative">
      {user ? (
        <div className="rounded-lg h-[200px] md:h-[150px] w-full absolute top-0 bg-gradient-to-bl from-gray-800 to-transparent">
          {favorite ? (
            <HiHeart
              onClick={handleFavorite}
              className="absolute top-1 right-1 w-8 h-8 text-red-500 hover:cursor-pointer"
            />
          ) : (
            <HiHeart
              onClick={handleFavorite}
              className="absolute top-1 right-1 w-8 h-8 text-white hover:cursor-pointer"
            />
          )}
        </div>
      ) : (
        <></>
      )}
      <img
        src={image}
        alt={label}
        className="rounded-lg h-[200px] md:h-[150px] w-full"
      />

      <div className="p-3">
        <p className="text-black font-semibold">{label}</p>

        <div className="mt-2">
          <span className="px-2 inline-block mr-2 py-1 border-[1px] border-black text-[12px] capitalize  shadow-xl rounded-full text-black">
            {cuisineType}
          </span>
          <span className="px-2 inline-block mr-2 py-1 border-[1px] border-black text-[12px] capitalize  shadow-xl rounded-full text-black">
            {mealType}
          </span>
        </div>
      </div>
      <Link
        to={`/recipes/${id}`}
        className="w-full flex justify-end self-end justify-self-end pb-1 md:w-[220px]"
      >
        <span className="px-2  capitalize underline  text-black text-l">
          Read more
        </span>
      </Link>
    </div>
  );
};

export default RecipeCard;
