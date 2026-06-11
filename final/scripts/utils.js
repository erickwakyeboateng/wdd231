export function setupNavigation() {
  const menuButton = document.querySelector("#menu-button");
  const navLinks = document.querySelector("#primary-nav");

  if (!menuButton || !navLinks) {
    return;
  }

  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", isOpen);
  });
}

export function setupFooter() {
  const year = document.querySelector("#currentyear");
  const lastModified = document.querySelector("#lastmodified");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (lastModified) {
    lastModified.textContent = document.lastModified;
  }
}

export async function getFoods() {
  try {
    const response = await fetch("data/foods.json");

    if (!response.ok) {
      throw new Error("Food data could not be loaded.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function getFavorites() {
  return JSON.parse(localStorage.getItem("favoriteFoods")) || [];
}

export function saveFavorites(favorites) {
  localStorage.setItem("favoriteFoods", JSON.stringify(favorites));
}

export function foodCardTemplate(food, isFavorite = false) {
  return `
    <article class="food-card">
      <img src="${food.image}" alt="${food.name}" width="640" height="400" loading="lazy">
      <div class="food-card-content">
        <h3>${food.name}</h3>
        <dl>
          <dt>Region</dt>
          <dd>${food.region}</dd>
          <dt>Main Ingredients</dt>
          <dd>${food.ingredients.join(", ")}</dd>
          <dt>Meal Time</dt>
          <dd>${food.mealTime}</dd>
          <dt>Type</dt>
          <dd>${food.type}</dd>
        </dl>
        <div class="card-actions">
          <button class="secondary-button details-button" type="button" data-id="${food.id}">Details</button>
          <button class="button favorite-button" type="button" data-id="${food.id}">
            ${isFavorite ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </article>
  `;
}
