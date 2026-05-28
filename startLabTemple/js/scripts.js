import { temples, url } from "../data/temples.js";

const showHere = document.querySelector("#showHere");

const mydialog = document.querySelector("#mydialog");

const templeTitle = document.querySelector("#mydialog h2");

const templeInfo = document.querySelector("#mydialog p");

const templeClose = document.querySelector("#closeModal");

function displayTemples(data) {
  data.forEach((temple) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const photo = document.createElement("img");

    photo.src = `${url}${temple.path}`;
    photo.alt = temple.name;
    photo.loading = "lazy";

    const name = document.createElement("h3");
    name.textContent = temple.name;

    card.appendChild(photo);
    card.appendChild(name);

    card.addEventListener("click", () => {
      showStuff(temple);
    });

    showHere.appendChild(card);
  });
}

function showStuff(temple) {
  templeTitle.textContent = temple.name;

  templeInfo.innerHTML = `
    <strong>Temple Number:</strong> ${temple.number}<br><br>

    <strong>Dedicated:</strong> ${temple.dedicated}<br><br>

    <strong>Dedicated By:</strong> ${temple.person}
  `;

  mydialog.showModal();
}

templeClose.addEventListener("click", () => {
  mydialog.close();
});

mydialog.addEventListener("click", (event) => {
  const dialogDimensions = mydialog.getBoundingClientRect();

  if (
    event.clientX < dialogDimensions.left ||
    event.clientX > dialogDimensions.right ||
    event.clientY < dialogDimensions.top ||
    event.clientY > dialogDimensions.bottom
  ) {
    mydialog.close();
  }
});


displayTemples(temples);
