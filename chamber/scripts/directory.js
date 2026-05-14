const url = "data/members.json";
const display = document.querySelector("#member-display");

function getMembershipLevel(level) {
  switch (level) {
    case 1:
      return "Member";
    case 2:
      return "Silver";
    case 3:
      return "Gold";
    default:
      return "Unknown";
  }
}

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

gridBtn.addEventListener("click", () => {
  display.classList.add("grid");
  display.classList.remove("list");
});

listBtn.addEventListener("click", () => {
  display.classList.add("list");
  display.classList.remove("grid");
});

const menuBtn = document.querySelector("#menu-toggle");
const navList = document.querySelector("#nav-list");

menuBtn.addEventListener("click", () => {
  navList.classList.toggle("show");
  menuBtn.classList.toggle("open")
});

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

getMembers();
