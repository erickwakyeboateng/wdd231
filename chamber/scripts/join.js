import { setupNavigation, showFooterDates } from "./modules.mjs";

const timestamp = document.querySelector("#timestamp");
timestamp.value = new Date().toISOString();

const modal = document.querySelector("#membership-modal");
const modalTitle = document.querySelector("#modal-title");
const modalBenefits = document.querySelector("#modal-benefits");
const modalButtons = document.querySelectorAll("[data-level]");
const closeButton = document.querySelector(".close-modal");

async function getMembershipLevels() {
  const response = await fetch("data/membership.json");
  const data = await response.json();
  return data.levels;
}

function displayModal(level) {
  modalTitle.textContent = level.title;
  modalBenefits.innerHTML = "";

  level.benefits.forEach((benefit) => {
    modalBenefits.innerHTML += `<p>${benefit}</p>`;
  });

  modal.showModal();
}

const membershipLevels = await getMembershipLevels();

modalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedLevel = membershipLevels.find((level) => level.id === button.dataset.level);
    displayModal(selectedLevel);
  });
});

closeButton.addEventListener("click", () => {
  modal.close();
});

setupNavigation();
showFooterDates();
