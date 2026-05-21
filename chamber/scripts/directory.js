import { getMembershipLevel, setupNavigation, showFooterDates } from "./modules.mjs";

const url = "data/members.json";
const display = document.querySelector("#member-display");

async function getMembers() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to load member data");
    }

    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error(error);
    display.innerHTML = "<p>Unable to load directory.</p>";
  }
}

function displayMembers(members) {
  display.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");

    card.innerHTML = `
      <img src="images/${member.image}" alt="Logo of ${member.name}" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p class="membership">Level: ${getMembershipLevel(member.membershipLevel)}</p>
    `;

    display.appendChild(card);
  });
}

const gridBtn = document.querySelector("#grid-view");
const listBtn = document.querySelector("#list-view");

if (gridBtn) {
  gridBtn.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
  });
}

if (listBtn) {
  listBtn.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
  });
}

setupNavigation();
showFooterDates();

if (display) {
  getMembers();
}
