function fireKey(type, code) {
  window.dispatchEvent(new KeyboardEvent(type, { code }));
}

export function initTouchControls() {
  const isTouchCapable =
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches;
  const isSmallScreen = window.innerWidth <= 820;

  // tampilkan kalau perangkat sentuh ATAU layar sempit (jaga-jaga
  // kalau simulasi sentuh di DevTools tidak aktif penuh)
  if (!isTouchCapable && !isSmallScreen) return;

  const wrap = document.createElement("div");
  wrap.id = "touch-controls";
  wrap.innerHTML = `
    <div class="touch-dpad">
      <button class="touch-btn" data-code="KeyA" aria-label="Gerak kiri">◀</button>
      <button class="touch-btn" data-code="KeyD" aria-label="Gerak kanan">▶</button>
    </div>
    <button class="touch-btn touch-jump" data-code="Space" aria-label="Lompat">⤴</button>
  `;
  document.body.appendChild(wrap);

  wrap.querySelectorAll("[data-code]").forEach((btn) => {
    const code = btn.dataset.code;

    const press = (e) => {
      e.preventDefault();
      fireKey("keydown", code);
      btn.classList.add("is-pressed");
    };
    const release = (e) => {
      e.preventDefault();
      fireKey("keyup", code);
      btn.classList.remove("is-pressed");
    };

    // Pointer Events: satu API untuk mouse DAN sentuh sekaligus
    btn.addEventListener("pointerdown", press);
    btn.addEventListener("pointerup", release);
    btn.addEventListener("pointerleave", release);
    btn.addEventListener("pointercancel", release);
  });

  const hero = document.getElementById("hero");
  if (hero) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        wrap.classList.toggle("tc-hidden", !entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(hero);
  }
}