import LoginForm from "../components/loginForm.js";
import RegisterForm from "../components/registerForm.js";
import DescriptionSection from "../components/descriptionSection.js";

export function renderHomeView() {
  // Main container
  const container = document.createElement("div");
  container.classList.add("container", "py-4");

  const row = document.createElement("div");
  row.classList.add("row", "justify-content-center");

  // Left column (Description)
  const colLeft = document.createElement("div");
  colLeft.classList.add("col-md-6", "py-4");
  colLeft.appendChild(DescriptionSection());

  // Right column (radio buttons + form)
  const colRight = document.createElement("div");
  colRight.classList.add("col-md-6", "mb-4");

  // First row (radio buttons)
  const radioRow = document.createElement("div");
  radioRow.classList.add("row", "mb-4");

  const radioGroup = document.createElement("div");
  radioGroup.classList.add("btn-group", "w-100");
  radioGroup.setAttribute("role", "group");

  const loginRadio = document.createElement("input");
  loginRadio.type = "radio";
  loginRadio.classList.add("btn-check");
  loginRadio.name = "authOption";
  loginRadio.id = "loginRadio";
  loginRadio.autocomplete = "off";
  loginRadio.checked = true;

  const loginLabel = document.createElement("label");
  loginLabel.classList.add("btn", "btn-outline-primary");
  loginLabel.setAttribute("for", "loginRadio");
  loginLabel.textContent = "Login";

  const registerRadio = document.createElement("input");
  registerRadio.type = "radio";
  registerRadio.classList.add("btn-check");
  registerRadio.name = "authOption";
  registerRadio.id = "registerRadio";
  registerRadio.autocomplete = "off";

  const registerLabel = document.createElement("label");
  registerLabel.classList.add("btn", "btn-outline-primary");
  registerLabel.setAttribute("for", "registerRadio");
  registerLabel.textContent = "Register";

  radioGroup.appendChild(loginRadio);
  radioGroup.appendChild(loginLabel);
  radioGroup.appendChild(registerRadio);
  radioGroup.appendChild(registerLabel);
  radioRow.appendChild(radioGroup);

  // Second row (dynamic form)
  const formRow = document.createElement("div");
  formRow.classList.add("row");

  const formContainer = document.createElement("div");
  formContainer.classList.add("col-12");
  let currentForm = LoginForm();
  formContainer.appendChild(currentForm);

  formRow.appendChild(formContainer);

  // Events to switch between login/register
  loginRadio.addEventListener("change", () => {
    formContainer.innerHTML = "";
    currentForm = LoginForm();
    formContainer.appendChild(currentForm);
  });

  registerRadio.addEventListener("change", () => {
    formContainer.innerHTML = "";
    currentForm = RegisterForm();
    formContainer.appendChild(currentForm);
  });

  // Add subrows to the right column
  colRight.appendChild(radioRow);
  colRight.appendChild(formRow);

  // Add columns to the main row
  row.appendChild(colLeft);
  row.appendChild(colRight);

  // Add row to the container
  container.appendChild(row);

  return container;
}
