(() => {
  const body = document.body;
  const toggle = document.getElementById("theme-toggle");

  // Apply saved theme
  const saved = localStorage.getItem("portfolio_theme");
  let isDark = saved === "dark";
  if (isDark) body.classList.add("dark");

  toggle.addEventListener("click", () => {
    isDark = !isDark;
    body.classList.toggle("dark", isDark);
    localStorage.setItem("portfolio_theme", isDark ? "dark" : "light");
  });

  // Last updated date
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  document.getElementById("last-updated").textContent = `${yyyy}-${mm}-${dd}`;
})();
