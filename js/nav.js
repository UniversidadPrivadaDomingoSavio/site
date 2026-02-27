/* =========================================================
   NAV.JS
   - Inicializa el menú y dropdowns cuando el layout ya está insertado
========================================================= */

function closeAllDropdowns(dropdowns, except = null) {
    dropdowns.forEach(d => {
      if (d !== except) {
        d.classList.remove("is-open");
        const btn = d.querySelector(".dropdown__btn");
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    });
  }
  
  function initNavbar() {
    const burger = document.getElementById("burger");
    const menu = document.getElementById("menu");
    const dropdowns = document.querySelectorAll(".dropdown");
  
    if (!menu) return;
  
    /* =========================
       Burger (móvil)
    ========================== */
    if (burger) {
      burger.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", String(isOpen));
        closeAllDropdowns(dropdowns);
      });
    }
  
    /* =========================
       Dropdowns
    ========================== */
    dropdowns.forEach(d => {
      const btn = d.querySelector(".dropdown__btn");
      if (!btn) return;
  
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const willOpen = !d.classList.contains("is-open");
        closeAllDropdowns(dropdowns, d);
        d.classList.toggle("is-open", willOpen);
        btn.setAttribute("aria-expanded", String(willOpen));
      });
    });
  
    /* =========================
       Click fuera cierra dropdowns
    ========================== */
    document.addEventListener("click", () => closeAllDropdowns(dropdowns));
  
    /* =========================
       ESC cierra todo
    ========================== */
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeAllDropdowns(dropdowns);
        if (menu && burger) {
          menu.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
        }
      }
    });
  }
  
  /* =========================================================
     Espera a que layout.js termine (header/footer insertados)
  ========================================================= */
  document.addEventListener("layout:loaded", initNavbar);