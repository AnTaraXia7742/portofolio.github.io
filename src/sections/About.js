import { BASE_URL } from "../config.js";
export function createAbout() {
  const section = document.createElement("section");
  section.id = "about";
  section.className = "level";

  section.innerHTML = `
    <span class="level-tag">Level 01</span>
    <h2 class="level-title">Tentang saya</h2>
    <div class="about-grid">
      <img
        src="${BASE_URL}/images/pasfoto.jpeg"
        alt="Foto Rhio Bagus Sadewo"
        class="about-photo"
        onerror="this.style.display='none'"
      />
      <div>
        <p class="level-text">
          Saya Rhio Bagus Sadewo, lulusan Teknik Informatika dengan pengalaman membangun
          produk digital di ekosistem startup melalui program "Gerakan Nasional 1000 Startup
          Digital", mencakup Front-End Development dan UI/UX Design dari riset dan wireframing
          hingga implementasi antarmuka.
        </p>
        <p class="level-text">
          Terbiasa bekerja lintas tim (product, development, design) dengan pendekatan
          problem solving yang sistematis, serta terus memperdalam keahlian di web development
          dan UI/UX design.
        </p>
        <div class="about-stats">
          <div><strong>10+</strong><span>Projects</span></div>
          <div><strong>3+</strong><span>Years Learning</span></div>
          <div><strong>1++</strong><span>Curiosity</span></div>
        </div>
      </div>
    </div>
  `;
  return section;
}