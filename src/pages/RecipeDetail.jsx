import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addRemoveFavorite,
  fetchRecipe,
  fetchRecipes,
  getLoggedInUser,
  getRecipeRating,
  isFavorite,
  rateRecipe,
} from "../utils";
import Loading from "../components/Loading";
import Header from "../components/Header";
import { AiFillPushpin } from "react-icons/ai";
import { BsPatchCheck } from "react-icons/bs";
import RecipeCard from "../components/RecipeCard";
import { HiHeart } from "react-icons/hi";
import { Rating } from "react-simple-star-rating";
import toast from "react-hot-toast";

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [favorite, setFavorite] = useState(isFavorite(id));
  const [rating, setRating] = useState(getRecipeRating(id));
  const user = getLoggedInUser();

  const getRecipe = async (id) => {
    try {
      setLoading(true);

      const data = await fetchRecipe(id);

      setRecipe(data);

      const recommend = await fetchRecipes({ query: recipe?.label, limit: 5 });

      setRecipes(recommend);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleFavorite = () => {
    setFavorite(addRemoveFavorite(recipe));
  };

  useEffect(() => {
    getRecipe(id);
  }, [id]);

  // Catch Rating value
  const handleRating = (_rating) => {
    rateRecipe(id, _rating);
    setRating(_rating);
    toast.success("Recipe rated successfully");
  };

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  return (
    <div className="w-full bg-white">
      <Header type="detail" title={recipe?.label} image={recipe?.image} />

      <div className="w-full px-4 lg:px-20 pt-5">
        <div className="flex gap-10 items-center justify-center px-4">
          <div className="flex flex-col justify-between">
            <span className="text-black text-center border border-gray-500 py-1.5 px-2 rounded-full mb-2">
              {recipe?.calories.toFixed(2)}{" "}
            </span>

            <p className="text-black text-[12px] md:text-md">CALORIES</p>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-black text-center border border-gray-500 py-1.5 rounded-full mb-2">
              {recipe?.totalTime}
            </span>
            <p className="text-black text-[12px] md:text-md">TOTAL TIME</p>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-black text-center border border-gray-500 py-1.5 rounded-full mb-2">
              {recipe?.yield}
            </span>
            <p className="text-black text-[12px] md:text-md">SERVINGS</p>
          </div>

          {user ? (
            <div
              onClick={handleFavorite}
              className="flex flex-col justify-center items-center hover:cursor-pointer"
            >
              {favorite ? (
                <HiHeart className="w-8 h-[38px] py-1.5 mb-2 text-red-500 " />
              ) : (
                <HiHeart className="w-8 h-[38px] py-1.5 mb-2 text-black" />
              )}
              <p className="text-black text-[12px] md:text-md">
                {favorite ? "FAVORITE" : "ADD TO FAVORITES"}
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row gap-8 py-20 pxx-4 md:px-10">
          {/* LEFT SIDE */}
          <div className="w-full md:w-2/4 md:border-r border-slate-800 pr-1">
            <div className="flex flex-col gap-5">
              <p className="text-[#FF928B]  text-2xl">Ingredients</p>

              {recipe?.ingredientLines?.map((ingredient, index) => {
                return (
                  <p key={index} className="text-black flex gap-2">
                    <AiFillPushpin className="text-[#FF928B]  text-xl" />{" "}
                    {ingredient}
                  </p>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 mt-20">
              <p className="text-[#FF928B] text-2xl">Health Labels</p>

              <div className="flex flex-wrap gap-4">
                {recipe?.healthLabels.map((item, index) => (
                  <p
                    className="text-black flex items-center gap-2 bg-[#fff5f518] px-4 py-1 border-[1px] border-black rounded-full "
                    key={index}
                  >
                    <BsPatchCheck color="#FF928B" /> {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-20">
              <p className="text-[#FF928B] text-2xl">Instructions</p>

              <p className="text-black">/</p>
            </div>

            {user ? (
              <div className="flex flex-col gap-3 mt-20">
                <p className="text-[#FF928B] text-2xl">
                  Please leave a rating below
                </p>
                <Rating
                  initialValue={rating}
                  onClick={handleRating}
                  SVGclassName={"inline-block"}
                />
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full md:w-2/4 2xl:pl-10 mt-20 md:mt-0">
            {recipes?.length > 0 && (
              <>
                <p className="text-black text-2xl">Also Try This</p>

                <div className="flex flex-wrap gap-6 px-1 pt-3">
                  {recipes?.map((item, index) => (
                    <RecipeCard recipe={item} index={index} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
