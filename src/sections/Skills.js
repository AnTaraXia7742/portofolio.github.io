import { skills } from "../data/skills.js";

export function createSkills() {
  const section = document.createElement("section");
  section.id = "skills";
  section.className = "level";

  const rows = skills
    .map(
      (s) => `
      <div class="skill-row">
        <div class="skill-row-top"><span>${s.name}</span><span>${s.xp} XP</span></div>
        <div class="skill-bar"><div class="skill-bar-fill" style="width:${s.xp}%"></div></div>
      </div>
    `
    )
    .join("");

  section.innerHTML = `
    <span class="level-tag">Level 03</span>
    <h2 class="level-title">Skill</h2>
    <div class="skill-list">${rows}</div>
  `;
  return section;
}