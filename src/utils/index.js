export async function fetchRecipes(filter) {
  const { query, limit } = filter;

  const url = `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_API_KEY}&from=0&to=${limit}&`;

  const response = await fetch(url);

  const data = await response.json();

  return data?.hits;
}

export async function fetchRecipe(id) {
  const url = `https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23${id}&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_API_KEY}`;

  const response = await fetch(url);

  const data = await response.json();

  return data[0];
}

export const addUser = (data) => {
  const users = localStorage.getItem("users");
  if (users) {
    const parsedUsers = JSON.parse(users);
    parsedUsers.push(data);
    localStorage.setItem("users", JSON.stringify(parsedUsers));
  } else {
    localStorage.setItem("users", JSON.stringify([data]));
  }
};

export const setLoggedInUser = (data) => {
  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  } else {
    localStorage.removeItem("user");
  }
};

export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
};

export const getUsers = () => {
  const users = localStorage.getItem("users");
  if (users) {
    const parsedUsers = JSON.parse(users);
    return parsedUsers;
  } else {
    return [];
  }
};

export const getFavorites = () => {
  const favorites = localStorage.getItem("favorites");
  if (favorites) {
    const parsedFavorites = JSON.parse(favorites);
    return parsedFavorites;
  } else {
    return [];
  }
};

export const addRemoveFavorite = (data) => {
  const favorites = localStorage.getItem("favorites");

  if (favorites) {
    const parsedFavorites = JSON.parse(favorites);
    const index = parsedFavorites.findIndex(
      (favRecipe) => favRecipe?.uri === data?.uri
    );

    if (index !== -1) {
      // Remove the favorite if it exists
      parsedFavorites.splice(index, 1);
      localStorage.setItem("favorites", JSON.stringify(parsedFavorites));
      return false;
    } else {
      // Add the favorite if it does not exist
      parsedFavorites.push(data);
      localStorage.setItem("favorites", JSON.stringify(parsedFavorites));
      return true;
    }
  } else {
    // If no favorites exist, create a new array with the data
    localStorage.setItem("favorites", JSON.stringify([data]));
    return true;
  }
};

export const rateRecipe = (id, val) => {
  const ratings = localStorage.getItem("ratings");
  if (ratings) {
    const parsedRatings = JSON.parse(ratings);
    localStorage.setItem(
      "ratings",
      JSON.stringify({ ...parsedRatings, [id]: val })
    );
  } else {
    // If no favorites exist, create a new array with the data
    localStorage.setItem("ratings", JSON.stringify({ [id]: val }));
  }
};

export const getRecipeRating = (id) => {
  const ratings = localStorage.getItem("ratings");

  if (ratings) {
    const parsedRatings = JSON.parse(ratings);
    return parsedRatings[id];
  } else {
    return 0;
  }
};

export const isFavorite = (id) => {
  const favorites = localStorage.getItem("favorites");

  if (favorites) {
    const parsedFavorites = JSON.parse(favorites);
    const index = parsedFavorites.findIndex((favRecipe) =>
      favRecipe.uri.includes(id)
    );
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
