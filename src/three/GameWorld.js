import * as THREE from "three";
import { Player } from "./Player.js";
import { CoinField } from "./Coins.js";
import { createCheckerTexture } from "./createCheckerTexture.js";

const PLATFORM_LAYOUT = [
  { x: 0, y: 0, w: 3, h: 0.4 },
  { x: 2.5, y: 0.8, w: 2, h: 0.4 },
  { x: 5, y: 1.6, w: 2, h: 0.4 },
  { x: 7.5, y: 1.0, w: 2, h: 0.4 },
  { x: 10, y: 1.8, w: 2, h: 0.4 },
  { x: 12.5, y: 1.2, w: 2, h: 0.4 },
  { x: 15, y: 2.0, w: 2, h: 0.4 },
  { x: 17.5, y: 1.4, w: 3, h: 0.4 }, // platform finish, lebih lebar
];

export class GameWorld {
  constructor(scene) {
    this.scene = scene;
    this.score = 0;
    this.keys = {};
    this.platforms = [];
    this._toastTimer = null;

    this._buildLights();
    this._buildPlatforms();

    const finish = PLATFORM_LAYOUT[PLATFORM_LAYOUT.length - 1];
    this.finishX = finish.x;
    this._buildFinishLine(finish.x, finish.y + finish.h / 2);

    this.player = new Player(scene);

    const coinPositions = PLATFORM_LAYOUT.map((p) => ({
      x: p.x,
      y: p.y + p.h / 2 + 0.5,
      z: 0,
    }));
    this.coins = new CoinField(scene, coinPositions);

    window.addEventListener("keydown", (e) => {
      this.keys[e.code] = true;
      if (e.code === "Space" || e.code === "KeyW" || e.code === "ArrowUp") {
        this.player.jump();
      }
    });
    window.addEventListener("keyup", (e) => (this.keys[e.code] = false));
  }

  _buildLights() {
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(3, 4, 3);
    this.scene.add(light);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  }

  _buildPlatforms() {
    const mat = new THREE.MeshStandardMaterial({ color: 0x232049 });
    PLATFORM_LAYOUT.forEach((p) => {
      const geo = new THREE.BoxGeometry(p.w, p.h, 2);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(p.x, p.y, 0);
      this.scene.add(mesh);
      this.platforms.push(mesh);
    });
  }

  _buildFinishLine(x, topY) {
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x232049 });
    const poleGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.2, 8);

    const poleLeft = new THREE.Mesh(poleGeo, poleMat);
    poleLeft.position.set(x, topY + 1.1, -0.9);
    this.scene.add(poleLeft);

    const poleRight = new THREE.Mesh(poleGeo, poleMat);
    poleRight.position.set(x, topY + 1.1, 0.9);
    this.scene.add(poleRight);

    const barGeo = new THREE.BoxGeometry(0.08, 0.08, 1.9);
    const bar = new THREE.Mesh(barGeo, poleMat);
    bar.position.set(x, topY + 2.15, 0);
    this.scene.add(bar);

    const bannerGeo = new THREE.PlaneGeometry(1.6, 0.5);
    const bannerMat = new THREE.MeshBasicMaterial({
      map: createCheckerTexture(),
      side: THREE.DoubleSide,
    });
    const banner = new THREE.Mesh(bannerGeo, bannerMat);
    banner.position.set(x, topY + 1.9, 0);
    this.scene.add(banner);
  }

  _triggerFinish() {
    this.player.reset();

    const toast = document.getElementById("finish-toast");
    if (toast) {
      toast.classList.add("show");
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
    }
  }

  update(camera) {
    this.player.update(this.keys, this.platforms);

    if (this.player.group.position.x >= this.finishX) {
      this._triggerFinish();
    }

    this.coins.update(this.player.group.position, () => {
      this.score += 10;
      const scoreEl = document.getElementById("hud-score");
      if (scoreEl) scoreEl.textContent = this.score;
    });

    camera.position.x += (this.player.group.position.x - camera.position.x) * 0.05;
    camera.lookAt(this.player.group.position.x, this.player.group.position.y, 0);
  }
}