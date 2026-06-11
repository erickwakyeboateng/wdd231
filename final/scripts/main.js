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

const featuredFoods = document.querySelector("#featured-foods");
const dialog = document.querySelector("#food-dialog");
const closeDialog = document.querySelector("#close-dialog");
const foods = await getFoods();

function renderFeaturedFoods() {
  const favorites = getFavorites();
  const featured = foods.slice(0, 3).map((food) => {
    return foodCardTemplate(food, favorites.includes(food.id));
  });

  featuredFoods.innerHTML = featured.join("");
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

if (featuredFoods) {
  renderFeaturedFoods();

  featuredFoods.addEventListener("click", (event) => {
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
      renderFeaturedFoods();
    }
  });
}

if (closeDialog) {
  closeDialog.addEventListener("click", () => {
    dialog.close();
  });
}
