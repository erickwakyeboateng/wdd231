import {
  foodCardTemplate,
  getFavorites,
  getFoods,
  saveFavorites,
  setupFooter,
  setupNavigation
} from "./utils.js";

setupNavigation();
setupFooter();

const foodList = document.querySelector("#food-list");
const foodCount = document.querySelector("#food-count");
const regionFilter = document.querySelector("#region-filter");
const favoritesFilter = document.querySelector("#favorites-filter");
const dialog = document.querySelector("#food-dialog");
const closeDialog = document.querySelector("#close-dialog");

let foods = [];
let showFavoritesOnly = false;

function renderFoods() {
  const favorites = getFavorites();
  const selectedRegion = regionFilter.value;

  let filteredFoods = foods.filter((food) => {
    return selectedRegion === "all" || food.region === selectedRegion;
  });

  if (showFavoritesOnly) {
    filteredFoods = filteredFoods.filter((food) => favorites.includes(food.id));
  }

  foodCount.textContent = `${filteredFoods.length} food item(s) shown`;
  foodList.innerHTML = filteredFoods
    .map((food) => foodCardTemplate(food, favorites.includes(food.id)))
    .join("");
}

function openFoodDialog(food) {
  document.querySelector("#dialog-image").src = food.image;
  document.querySelector("#dialog-image").alt = food.name;
  document.querySelector("#dialog-title").textContent = food.name;
  document.querySelector("#dialog-description").textContent = food.description;
  document.querySelector("#dialog-region").textContent = food.region;
  document.querySelector("#dialog-ingredients").textContent = food.ingredients.join(", ");
  document.querySelector("#dialog-meal").textContent = food.mealTime;
  dialog.showModal();
}

foodList.addEventListener("click", (event) => {
  const detailsButton = event.target.closest(".details-button");
  const favoriteButton = event.target.closest(".favorite-button");

  if (detailsButton) {
    const food = foods.find((item) => item.id === detailsButton.dataset.id);
    openFoodDialog(food);
  }

  if (favoriteButton) {
    const foodId = favoriteButton.dataset.id;
    const favorites = getFavorites();
    const updatedFavorites = favorites.includes(foodId)
      ? favorites.filter((id) => id !== foodId)
      : [...favorites, foodId];

    saveFavorites(updatedFavorites);
    renderFoods();
  }
});

regionFilter.addEventListener("change", renderFoods);

favoritesFilter.addEventListener("click", () => {
  showFavoritesOnly = !showFavoritesOnly;
  favoritesFilter.textContent = showFavoritesOnly ? "Show All Foods" : "Show Favorites";
  renderFoods();
});

closeDialog.addEventListener("click", () => {
  dialog.close();
});

foods = await getFoods();
renderFoods();
