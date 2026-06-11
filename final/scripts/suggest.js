import { setupFooter, setupNavigation } from "./utils.js";

setupNavigation();
setupFooter();

const timestamp = document.querySelector("#timestamp");

if (timestamp) {
  timestamp.value = new Date().toISOString();
}
