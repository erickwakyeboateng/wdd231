import { setupNavigation, showFooterDates } from "./modules.mjs";

const params = new URLSearchParams(window.location.search);

document.querySelector("#firstName").textContent = params.get("firstName") || "";
document.querySelector("#lastName").textContent = params.get("lastName") || "";
document.querySelector("#email").textContent = params.get("email") || "";
document.querySelector("#phone").textContent = params.get("phone") || "";
document.querySelector("#businessName").textContent = params.get("businessName") || "";
document.querySelector("#timestampDisplay").textContent = params.get("timestamp") || "";

setupNavigation();
showFooterDates();
