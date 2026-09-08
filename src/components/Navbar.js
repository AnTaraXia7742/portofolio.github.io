const LINKS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function initNavbar() {
  const nav = document.getElementById("navbar");

  const brand = document.createElement("span");
  brand.className = "nav-brand";
  brand.textContent = "RBS";
  nav.appendChild(brand);

  const list = document.createElement("ul");
  list.className = "nav-list";

  LINKS.forEach((link) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${link.id}`;
    a.textContent = link.label;
    a.dataset.target = link.id;
    li.appendChild(a);
    list.appendChild(li);
  });
  nav.appendChild(list);

  const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
  const linkEls = Array.from(list.querySelectorAll("a"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          linkEls.forEach((a) =>
            a.classList.toggle("is-active", a.dataset.target === entry.target.id)
          );
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((s) => observer.observe(s));
}