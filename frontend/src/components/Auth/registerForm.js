export default function RegisterForm() {
  // Centered main container
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

  // Title
  const title = document.createElement("h4");
  title.classList.add("text-center", "mb-4");
  title.textContent = "Register";
  card.appendChild(title);

  // Form
  const form = document.createElement("form");

  // Name
  const nameGroup = document.createElement("div");
  nameGroup.classList.add("mb-3");

  const nameLabel = document.createElement("label");
  nameLabel.classList.add("form-label");
  nameLabel.textContent = "Name";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.classList.add("form-control");
  nameInput.placeholder = "Enter your name";

  nameGroup.appendChild(nameLabel);
  nameGroup.appendChild(nameInput);

  // Date of birth
  const birthGroup = document.createElement("div");
  birthGroup.classList.add("mb-3");

  const birthLabel = document.createElement("label");
  birthLabel.classList.add("form-label");
  birthLabel.textContent = "Date of Birth";

  const birthInput = document.createElement("input");
  birthInput.type = "date";
  birthInput.classList.add("form-control");

  birthGroup.appendChild(birthLabel);
  birthGroup.appendChild(birthInput);

  // Email
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

  // Password
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

  // Submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.classList.add("btn", "btn-primary", "w-100");
  submitButton.textContent = "Register";

  // Append all to form
  form.appendChild(nameGroup);
  form.appendChild(birthGroup);
  form.appendChild(emailGroup);
  form.appendChild(passwordGroup);
  form.appendChild(submitButton);

  form.onsubmit = (e) => {
    e.preventDefault();
    console.log("Registration attempted");
  };

  card.appendChild(form);
  wrapper.appendChild(card);

  return wrapper;
}
