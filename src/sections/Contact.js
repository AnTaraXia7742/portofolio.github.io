export function createContact() {
  const section = document.createElement("section");
  section.id = "contact";
  section.className = "level";

  section.innerHTML = `
    <span class="level-tag">Level 04</span>
    <h2 class="level-title">Punya ide proyek?</h2>
    <p class="level-text">Mari bangun sesuatu yang bermakna bersama.</p>
    <a href="mailto:bagussadewo7742@gmail.com" class="cta-button">Kirim email</a>
  `;
  return section;
}