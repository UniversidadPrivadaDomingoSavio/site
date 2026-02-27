/* =========================================================
   LAYOUT.JS
   - Inserta header y footer desde /partials
   - Dispara evento "layout:loaded" cuando termina
========================================================= */

async function injectPartial(targetId, partialPath) {
    const target = document.getElementById(targetId);
    if (!target) return;

    try {
        const res = await fetch(partialPath, { cache: "no-cache" });
        if (!res.ok) {
            console.error(`Error al cargar ${partialPath}: ${res.status} ${res.statusText}`);
            return;
        }
        const html = await res.text();
        target.innerHTML = html;
    } catch (error) {
        console.error(`Error al intentar cargar ${partialPath}:`, error);
    }
}
  
function setFooterYear() {
    const y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
}
  
function markCurrentLink() {
    // Marca el link activo comparando el nombre del archivo
    const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  
    document.querySelectorAll("a.navlink").forEach(a => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      if (href === current) {
        a.classList.add("is-current");
  
        // Si está dentro de un dropdown, también marca el botón
        const dropdown = a.closest(".dropdown");
        if (dropdown) {
          const btn = dropdown.querySelector(".dropdown__btn");
          if (btn) btn.classList.add("is-current");
        }
      }
    });
}
  
(async function initLayout(){
    /* =========================
       Inyectar header y footer
    ========================== */
    await injectPartial("site-header", "./partials/header.html");
    await injectPartial("site-footer", "./partials/footer.html");
    /* =========================
       Ajustes luego de inyectar
    ========================== */
    setFooterYear();
    markCurrentLink();
  
    /* =========================
       Notificar que el layout está listo
    ========================== */
    document.dispatchEvent(new CustomEvent("layout:loaded"));
})();