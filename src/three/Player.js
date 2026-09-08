import * as THREE from "three";

const GRAVITY = -0.02;
const MOVE_SPEED = 0.08;
const JUMP_FORCE = 0.32;
const HALF_HEIGHT = 0.35; // setengah tinggi kapsul, dipakai untuk collision

export class Player {
  constructor(scene) {
    this.group = new THREE.Group();

    // badan: kapsul (pil) bukan kotak lagi
    const bodyGeo = new THREE.CapsuleGeometry(0.22, 0.3, 4, 12);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xff5ec4,
      emissive: 0x5a1236,
      emissiveIntensity: 0.5,
      roughness: 0.35,
    });
    this.mesh = new THREE.Mesh(bodyGeo, bodyMat);
    this.group.add(this.mesh);

    // "visor" kecil di depan biar terlihat arah hadapnya
    const visorGeo = new THREE.BoxGeometry(0.18, 0.08, 0.05);
    const visorMat = new THREE.MeshStandardMaterial({ color: 0x0d0b1f });
    this.visor = new THREE.Mesh(visorGeo, visorMat);
    this.visor.position.set(0, 0.08, 0.2);
    this.group.add(this.visor);

    this.group.position.set(0, 1, 0);
    scene.add(this.group);

    this.velocity = { x: 0, y: 0 };
    this.onGround = false;
  }

  jump() {
    if (this.onGround) {
      this.velocity.y = JUMP_FORCE;
      this.onGround = false;
    }
  }

    reset() {
    this.group.position.set(0, 1, 0);
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  update(keys, platforms) {
    this.velocity.x = 0;
    if (keys["KeyA"] || keys["ArrowLeft"]) this.velocity.x = -MOVE_SPEED;
    if (keys["KeyD"] || keys["ArrowRight"]) this.velocity.x = MOVE_SPEED;

    this.velocity.y += GRAVITY;

    this.group.position.x += this.velocity.x;
    this.group.position.y += this.velocity.y;

    // miring dikit ke arah gerak biar ada "rasa" gerak
    this.group.rotation.z = THREE.MathUtils.lerp(
      this.group.rotation.z,
      -this.velocity.x * 3,
      0.2
    );

    this.onGround = false;
    for (const p of platforms) {
      const halfW = p.geometry.parameters.width / 2;
      const topY = p.position.y + p.geometry.parameters.height / 2;

      const withinX = Math.abs(this.group.position.x - p.position.x) < halfW;
      const fallingOntoTop =
        this.velocity.y <= 0 &&
        this.group.position.y - HALF_HEIGHT >= topY - 0.2 &&
        this.group.position.y - HALF_HEIGHT <= topY + 0.25;

      if (withinX && fallingOntoTop) {
        this.group.position.y = topY + HALF_HEIGHT;
        this.velocity.y = 0;
        this.onGround = true;
      }
    }

    if (this.group.position.y < -5) {
      this.group.position.set(0, 1, 0);
      this.velocity.y = 0;
    }
  }
}