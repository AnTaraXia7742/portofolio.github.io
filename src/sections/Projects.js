import { BASE_URL } from "../config.js";
import { projects } from "../data/projects.js";

function openLightbox(src, alt) {
  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Tutup">✕</button>
    <img src="${src}" alt="${alt}" />
  `;
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.classList.contains("lightbox-close")) {
      overlay.remove();
    }
  });
  document.body.appendChild(overlay);
}

export function createProjects() {
  const section = document.createElement("section");
  section.id = "projects";
  section.className = "level";

  const cards = projects
    .map((p, i) => {
      const links = [];
      if (p.demoLink) links.push(`<a href="${p.demoLink}" class="card-link" target="_blank" rel="noopener">Live Demo</a>`);
      if (p.githubLink) links.push(`<a href="${p.githubLink}" class="card-link" target="_blank" rel="noopener">GitHub</a>`);
      if (!p.demoLink && !p.githubLink) links.push(`<button class="card-link card-link-btn" data-preview="${i}">Lihat pratinjau</button>`);

      return `
        <article class="card">
          <img src="${BASE_URL}${p.image}" alt="Tampilan proyek ${p.title}" class="card-image" data-preview="${i}" onerror="this.style.display='none'" />
          <div class="card-body">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <ul class="tags">
              ${p.tags.map((t) => `<li>${t}</li>`).join("")}
            </ul>
            <div class="card-links">${links.join("")}</div>
          </div>
        </article>
      `;
    })
    .join("");

  section.innerHTML = `
    <span class="level-tag">Level 02</span>
    <h2 class="level-title">Proyek</h2>
    <div class="card-grid">${cards}</div>
  `;

  section.querySelectorAll("[data-preview]").forEach((el) => {
    el.addEventListener("click", () => {
      const p = projects[Number(el.dataset.preview)];
      openLightbox(BASE_URL + (p.preview || p.image), p.title);
    });
  });

  return section;
}