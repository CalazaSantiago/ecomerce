document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.querySelector('a[href="#modal-producto1"], a.btn-agregar'); // tu botón "Añadir"
  const modal = document.getElementById("modal-overlay");
  const closeBtn = document.getElementById("closeModalBtn");

  if (openBtn && modal && closeBtn) {
    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.remove("hidden");
    });

    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });

    const form = document.getElementById("productForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      console.log("Producto agregado:", data);
      form.reset();
      modal.classList.add("hidden");
    });
  }
});
