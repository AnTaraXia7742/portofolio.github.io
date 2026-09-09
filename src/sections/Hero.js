import { BASE_URL } from "../config.js";
export function createHero() {
  const section = document.createElement("section");
  section.id = "hero";
  section.className = "hero-stage";

  section.innerHTML = `
    <div class="hero-overlay">
      <p class="hero-eyebrow">Junior Full Stack Developer · Laravel & React</p>
      <h1 class="hero-title">Halo, saya Rhio.<br />Karakter di belakang layar ini juga saya yang gerakin.</h1>
      <p class="hero-subtitle">
        Sehari-hari nulis kode Laravel dan React. Sesekali iseng bikin hal receh
        kayak mini game kecil ini. Kalau sudah puas main, scroll ke bawah ada
        proyek yang lebih proper.
      </p>
      <div class="hero-actions">
        <a href="#projects" class="hero-btn hero-btn-primary">Lihat Proyek</a>
        <a href="${BASE_URL}/docs/CV_RHIO_BAGUS_SADEWO.pdf" class="hero-btn hero-btn-outline" download>Download CV</a>
      </div>
    </div>
  `;
  return section;
}