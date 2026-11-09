const MESSENGER_LINK = "https://m.me/YourPageUsername";

const flavors = [
  {
    name: "Buffalo",
    icon: "🔥",
    heat: "Medium",
    description: "The classic: tangy buffalo sauce with a buttery, vinegary kick."
  },
  {
    name: "Honey BBQ",
    icon: "🍯",
    heat: "Mild",
    description: "Sweet, smoky barbecue sauce finished with a sticky honey glaze."
  },
  {
    name: "Garlic Parmesan",
    icon: "🧄",
    heat: "Mild",
    description: "Buttery garlic, herbs, and a heavy shower of Parmesan cheese."
  },
  {
    name: "Lemon Pepper",
    icon: "🍋",
    heat: "Mild",
    description: "Bright citrus, cracked black pepper, and a savory dry-rub finish."
  },
  {
    name: "Nashville Hot",
    icon: "🌶️",
    heat: "Hot",
    description: "Cayenne-forward heat with a little sweetness and a lot of attitude."
  },
  {
    name: "Mango Habanero",
    icon: "🥭",
    heat: "Hot",
    description: "Tropical mango sweetness colliding with fierce habanero heat."
  },
  {
    name: "Cajun Dry Rub",
    icon: "🌿",
    heat: "Medium",
    description: "Smoky paprika, garlic, onion, and Louisiana-style Cajun spice."
  },
  {
    name: "Teriyaki",
    icon: "🍢",
    heat: "Mild",
    description: "Sweet soy glaze with ginger, garlic, and a glossy savory finish."
  },
  {
    name: "Korean Gochujang",
    icon: "🇰🇷",
    heat: "Medium",
    description: "Sticky, spicy-sweet gochujang glaze with sesame and garlic."
  },
  {
    name: "Reaper Inferno",
    icon: "💀",
    heat: "Extra Hot",
    description: "For heat hunters only: blistering pepper sauce with a smoky edge."
  }
];

const sizes = [6, 12, 24];
const grid = document.getElementById("flavorGrid");

function createCard(flavor, index) {
  const card = document.createElement("article");
  card.className = "wing-card";
  card.innerHTML = `
    <div class="wing-visual" aria-hidden="true">${flavor.icon}</div>
    <div class="wing-card-body">
      <span class="wing-tag">${flavor.heat}</span>
      <h3>${flavor.name}</h3>
      <p>${flavor.description}</p>
      <div class="wing-options" role="group" aria-label="Choose wing count for ${flavor.name}">
        ${sizes.map((size, i) => `
          <button
            class="wing-option${i === 1 ? " active" : ""}"
            type="button"
            data-size="${size}"
            aria-pressed="${i === 1}">
            ${size} wings
          </button>
        `).join("")}
      </div>
      <a
        class="btn messenger-btn order-btn"
        href="${MESSENGER_LINK}"
        target="_blank"
        rel="noopener"
        data-flavor="${flavor.name}"
        data-size="12">
        Order on Messenger
      </a>
    </div>
  `;
  return card;
}

flavors.forEach((flavor, index) => {
  grid.appendChild(createCard(flavor, index));
});

grid.addEventListener("click", (event) => {
  const option = event.target.closest(".wing-option");
  if (!option) return;

  const options = option.closest(".wing-options");
  options.querySelectorAll(".wing-option").forEach((button) => {
    button.classList.remove("active");
    button.setAttribute("aria-pressed", "false");
  });

  option.classList.add("active");
  option.setAttribute("aria-pressed", "true");

  const card = option.closest(".wing-card");
  const orderButton = card.querySelector(".order-btn");
  orderButton.dataset.size = option.dataset.size;
});

grid.addEventListener("click", (event) => {
  const button = event.target.closest(".order-btn");
  if (!button) return;

  const flavor = button.dataset.flavor;
  const size = button.dataset.size;
  const message = `Hi! I'd like to order ${size} ${flavor} chicken wings for delivery.`;
  button.href = `${MESSENGER_LINK}?text=${encodeURIComponent(message)}`;
});

const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

document.getElementById("year").textContent = new Date().getFullYear();
