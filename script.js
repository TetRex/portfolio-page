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

  const projectsGrid = document.querySelector(".projects-grid");
  const projectCards = Array.from(document.querySelectorAll(".project-card"));
  const starEls = document.querySelectorAll(".project-stars");
  const starCountFormatter = new Intl.NumberFormat("en-US");

  projectCards.forEach((card, index) => {
    card.dataset.originalOrder = String(index);
  });

  function sortProjectCards() {
    if (!projectsGrid) return;

    const sortedCards = [...projectCards].sort((a, b) => {
      const aStars = Number(a.dataset.starCount);
      const bStars = Number(b.dataset.starCount);
      const aHasStars = Number.isFinite(aStars);
      const bHasStars = Number.isFinite(bStars);

      if (aHasStars && bHasStars && aStars !== bStars) {
        return bStars - aStars;
      }

      if (aHasStars !== bHasStars) {
        return aHasStars ? -1 : 1;
      }

      return Number(a.dataset.originalOrder) - Number(b.dataset.originalOrder);
    });

    sortedCards.forEach((card) => {
      projectsGrid.appendChild(card);
    });
  }

  async function loadGitHubStars() {
    const requests = Array.from(starEls, async (starEl) => {
      const repo = starEl.dataset.repo;
      const card = starEl.closest(".project-card");

      if (!repo) {
        starEl.textContent = "Stars: —";
        if (card) card.dataset.starCount = "";
        return;
      }

      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (card) card.dataset.starCount = String(data.stargazers_count);
        starEl.textContent = `Stars: ${starCountFormatter.format(data.stargazers_count)}`;
      } catch {
        if (card) card.dataset.starCount = "";
        starEl.textContent = "Stars: unavailable";
      }
    });

    await Promise.all(requests);
    sortProjectCards();
  }

  loadGitHubStars();

  // External Data Demo
  const loadBtn = document.getElementById("load-data");
  const result = document.getElementById("data-result");

  // Why do we use async/await?
  // It lets us write asynchronous fetch code in a sequential, readable style
  // instead of chaining .then() callbacks.

  // Why do we check response.ok?
  // fetch() only rejects on network failures, not HTTP errors (e.g. 404/500).
  // Checking response.ok ensures we catch server-side error responses too.

  // Why do we use try/catch?
  // It handles both network failures and thrown errors in one place,
  // so the user always sees a meaningful message instead of a silent failure.

  loadBtn.addEventListener("click", async () => {
    result.textContent = "Loading…";
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const user = await response.json();

      result.textContent = "";
      const dl = document.createElement("dl");
      const fields = [
        ["Name", user.name],
        ["Email", user.email],
        ["Company", user.company.name],
      ];
      for (const [label, value] of fields) {
        const dt = document.createElement("dt");
        dt.textContent = label;
        const dd = document.createElement("dd");
        dd.textContent = value;
        dl.appendChild(dt);
        dl.appendChild(dd);
      }
      result.appendChild(dl);
    } catch {
      result.textContent = "Error loading data";
    }
  });

  // Last updated date
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  document.getElementById("last-updated").textContent = `${yyyy}-${mm}-${dd}`;
})();
