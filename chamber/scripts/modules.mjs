export function setupNavigation() {
  const menuBtn = document.querySelector("#menu-toggle");
  const navList = document.querySelector("#nav-list");

  menuBtn.addEventListener("click", () => {
    navList.classList.toggle("show");
    menuBtn.classList.toggle("open");
  });
}

export function showFooterDates() {
  document.querySelector("#year").textContent = new Date().getFullYear();
  document.querySelector("#lastModified").textContent = document.lastModified;
}

export function getMembershipLevel(level) {
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
