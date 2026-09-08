import { SceneManager } from "./three/SceneManager.js";
import { initLoader } from "./components/Loader.js";
import { initNavbar } from "./components/Navbar.js";
import { initTouchControls } from "./components/TouchControls.js";
import { createHero } from "./sections/Hero.js";
import { createAbout } from "./sections/About.js";
import { createProjects } from "./sections/Projects.js";
import { createSkills } from "./sections/Skills.js";
import { createContact } from "./sections/Contact.js";

export const App = {
  init() {
    const content = document.getElementById("content");
    content.appendChild(createHero());
    content.appendChild(createAbout());
    content.appendChild(createProjects());
    content.appendChild(createSkills());
    content.appendChild(createContact());

    initNavbar();
    initLoader();
    initTouchControls();

    const canvas = document.getElementById("game-canvas");
    const sceneManager = new SceneManager(canvas);
    sceneManager.start();
  },
};