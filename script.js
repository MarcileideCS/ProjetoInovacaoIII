const trends = [
  {
    category: "IA",
    title: "Copilotos corporativos",
    description: "Assistentes especializados conectados ao contexto interno das empresas.",
    score: 91,
  },
  {
    category: "Cloud",
    title: "Arquitetura edge-first",
    description: "Processamento distribuido perto da fonte para reduzir latencia.",
    score: 84,
  },
  {
    category: "Seguranca",
    title: "Zero Trust por design",
    description: "Autorizacao continua com politicas dinamicas orientadas por risco.",
    score: 88,
  },
  {
    category: "Dados",
    title: "Data products",
    description: "Dominios publicam dados como produtos com SLA e ownership claros.",
    score: 79,
  },
  {
    category: "Dev",
    title: "Plataformas internas",
    description: "Times de desenvolvimento consomem fluxos padronizados de entrega.",
    score: 82,
  },
  {
    category: "IA",
    title: "Modelos multimodais",
    description: "Texto, audio e visao unificados para tarefas complexas de produto.",
    score: 87,
  },
];

const facts = [
  "Empresas orientadas por dados tendem a escalar decisao com mais velocidade.",
  "Observabilidade madura ajuda a antecipar incidentes antes do usuario final.",
  "Automacao de pipeline acelera releases e reduz erros manuais.",
  "Cultura de experimentacao aumenta a taxa de inovacao em produtos digitais.",
  "Boas APIs internas diminuem dependencia entre equipes e aumentam autonomia.",
];

const maturity = [
  { name: "IA Generativa", value: 72 },
  { name: "Seguranca Cloud", value: 81 },
  { name: "Automacao de Deploy", value: 76 },
  { name: "Data Governance", value: 67 },
];

const trendGrid = document.getElementById("trend-grid");
const filters = document.getElementById("filters");
const factEl = document.getElementById("fact");
const factBtn = document.getElementById("fact-btn");
const surpriseBtn = document.getElementById("surprise-btn");
const clockEl = document.getElementById("clock");
const statsEl = document.getElementById("stats");

let currentCategory = "Todos";

function renderFilters() {
  const categories = ["Todos", ...new Set(trends.map((t) => t.category))];

  filters.innerHTML = categories
    .map(
      (category) => `
        <button class="filter-chip ${category === currentCategory ? "active" : ""}" data-category="${category}">
          ${category}
        </button>
      `,
    )
    .join("");

  Array.from(filters.querySelectorAll("button")).forEach((button) => {
    button.addEventListener("click", () => {
      currentCategory = button.dataset.category;
      renderFilters();
      renderTrends();
    });
  });
}

function renderTrends() {
  const items =
    currentCategory === "Todos"
      ? trends
      : trends.filter((trend) => trend.category === currentCategory);

  trendGrid.innerHTML = items
    .map(
      (trend) => `
        <article class="trend-card">
          <span class="tag">${trend.category}</span>
          <h3>${trend.title}</h3>
          <p>${trend.description}</p>
          <div class="score">Sinal: ${trend.score}/100</div>
        </article>
      `,
    )
    .join("");
}

function renderStats() {
  statsEl.innerHTML = maturity
    .map(
      (item) => `
        <div class="stat-item">
          <div class="stat-header">
            <span>${item.name}</span>
            <span>${item.value}%</span>
          </div>
          <div class="progress"><span data-width="${item.value}"></span></div>
        </div>
      `,
    )
    .join("");

  requestAnimationFrame(() => {
    Array.from(statsEl.querySelectorAll(".progress > span")).forEach((bar) => {
      bar.style.width = `${bar.dataset.width}%`;
    });
  });
}

function randomFact() {
  const index = Math.floor(Math.random() * facts.length);
  factEl.textContent = facts[index];
}

function tickClock() {
  const now = new Date();
  clockEl.textContent = now.toLocaleTimeString("pt-BR", {
    hour12: false,
  });
}

function surpriseTheme() {
  const root = document.documentElement;
  const themes = [
    { accent: "#0f766e", accent2: "#f59e0b" },
    { accent: "#0f172a", accent2: "#22c55e" },
    { accent: "#be123c", accent2: "#f97316" },
  ];

  const pick = themes[Math.floor(Math.random() * themes.length)];
  root.style.setProperty("--accent", pick.accent);
  root.style.setProperty("--accent-2", pick.accent2);
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });
}

factBtn.addEventListener("click", randomFact);
surpriseBtn.addEventListener("click", surpriseTheme);

renderFilters();
renderTrends();
renderStats();
setupReveal();
randomFact();
tickClock();
setInterval(tickClock, 1000);
