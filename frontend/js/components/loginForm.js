// frontend/js/components/loginForm.js

export default function LoginForm() {
  // Contenedor principal centrado
  const wrapper = document.createElement("div");
  wrapper.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );

  // Card
  const card = document.createElement("div");
  card.classList.add("card", "shadow", "p-4");
  card.style.width = "100%";
  card.style.maxWidth = "400px";

  // Tabs de login/register podrían ir fuera de esta card si decides moverlos luego

  // Título
  const title = document.createElement("h4");
  title.classList.add("text-center", "mb-4");
  title.textContent = "Login";
  card.appendChild(title);

  // Formulario
  const form = document.createElement("form");

  const emailGroup = document.createElement("div");
  emailGroup.classList.add("mb-3");

  const emailLabel = document.createElement("label");
  emailLabel.classList.add("form-label");
  emailLabel.textContent = "Email";

  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.classList.add("form-control");
  emailInput.placeholder = "Enter your email";

  emailGroup.appendChild(emailLabel);
  emailGroup.appendChild(emailInput);

  const passwordGroup = document.createElement("div");
  passwordGroup.classList.add("mb-3");

  const passwordLabel = document.createElement("label");
  passwordLabel.classList.add("form-label");
  passwordLabel.textContent = "Password";

  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.classList.add("form-control");
  passwordInput.placeholder = "Enter your password";

  passwordGroup.appendChild(passwordLabel);
  passwordGroup.appendChild(passwordInput);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.classList.add("btn", "btn-primary", "w-100");
  submitButton.textContent = "Log In";

  form.appendChild(emailGroup);
  form.appendChild(passwordGroup);
  form.appendChild(submitButton);

  form.onsubmit = (e) => {
    e.preventDefault();
    console.log("Login attempted");
  };

  card.appendChild(form);
  wrapper.appendChild(card);

  return wrapper;
}
