import { setupNavigation, showFooterDates } from "./modules.mjs";
import { places } from "../data/discover.mjs";

const cards = document.querySelector("#discover-cards");
const visitMessage = document.querySelector("#visit-message");

function displayPlaces() {
  places.forEach((place) => {
    const card = document.createElement("section");
    card.classList.add("discover-card");

    card.innerHTML = `
      <h2>${place.name}</h2>
      <figure>
        <img src="images/${place.image}" alt="${place.name}" loading="lazy">
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button type="button">Learn More</button>
    `;

    cards.appendChild(card);
  });
}

function displayVisitMessage() {
  const lastVisit = Number(localStorage.getItem("discoverLastVisit"));
  const today = Date.now();
  const oneDay = 1000 * 60 * 60 * 24;

  if (!lastVisit) {
    visitMessage.textContent =
      "Welcome! Let us know if you have any questions.";
  } else {
    const daysBetween = Math.floor((today - lastVisit) / oneDay);

    if (daysBetween < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
    }
  }

  localStorage.setItem("discoverLastVisit", today);
}

setupNavigation();
showFooterDates();
displayVisitMessage();
displayPlaces();
