import React, { useState } from "react";
import Loading from "./Loading";
import RecipeCard from "./RecipeCard";
import { getFavorites } from "../utils";

const Favorites = () => {
  const [recipes, setRecipes] = useState(getFavorites());
  const [loading] = useState(false);

  return (
    <div className="w-full">
      {!recipes ? <Loading /> : <></>}
      {recipes?.length > 0 ? (
        <>
          <div className="w-full  flex flex-wrap justify-center gap-10 px-0 lg:px-10 py-10">
            {recipes?.map((item) => (
              <RecipeCard
                onFavoriteToggle={() => setRecipes(getFavorites())}
                recipe={{ recipe: item }}
                key={item.uri}
              />
            ))}
          </div>
          {loading ? <Loading /> : <></>}
        </>
      ) : (
        <div className="text-black w-full items-center justify-center py-10">
          <p className="text-center">No favorites found</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
