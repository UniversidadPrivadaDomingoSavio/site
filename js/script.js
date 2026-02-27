// Menú móvil
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

if (burger && menu) {
  burger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(isOpen));
  });
}

// Dropdowns (desktop y mobile)
const dropdowns = document.querySelectorAll(".dropdown");

function closeAllDropdowns(except = null) {
  dropdowns.forEach(d => {
    if (d !== except) {
      d.classList.remove("is-open");
      const btn = d.querySelector(".dropdown__btn");
      if (btn) btn.setAttribute("aria-expanded", "false");
    }
  });
}

dropdowns.forEach(d => {
  const btn = d.querySelector(".dropdown__btn");
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const willOpen = !d.classList.contains("is-open");
    closeAllDropdowns(d);
    d.classList.toggle("is-open", willOpen);
    btn.setAttribute("aria-expanded", String(willOpen));
  });
});

document.addEventListener("click", () => closeAllDropdowns());

// Selector de idiomas (demo visual)
document.querySelectorAll(".lang__item").forEach(a => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll(".lang__item").forEach(x => x.classList.remove("is-active"));
    a.classList.add("is-active");
  });
});

// Form newsletter (demo)
const form = document.getElementById("newsletterForm");
const msg = document.getElementById("formMsg");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = new FormData(form).get("email");

    if (msg) msg.textContent = `Listo. Quedó registrado: ${email} (demo).`;
    form.reset();
  });
}