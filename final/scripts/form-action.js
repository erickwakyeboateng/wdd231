import { setupFooter, setupNavigation } from "./utils.js";

setupNavigation();
setupFooter();

const results = document.querySelector("#form-results");
const params = new URLSearchParams(window.location.search);
const fields = ["name", "food", "region", "reason", "timestamp"];

const submittedValues = fields.map((field) => {
  const label = field.charAt(0).toUpperCase() + field.slice(1);
  const value = params.get(field) || "Not provided";

  return `
    <div>
      <dt>${label}</dt>
      <dd>${value}</dd>
    </div>
  `;
});

results.innerHTML = `<dl>${submittedValues.join("")}</dl>`;
