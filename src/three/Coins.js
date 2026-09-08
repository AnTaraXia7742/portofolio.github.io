import * as THREE from "three";

const RESPAWN_DELAY = 4000; // ms

export class CoinField {
  constructor(scene, positions) {
    this.scene = scene;

    const geo = new THREE.TorusGeometry(0.2, 0.07, 8, 16);
    const mat = new THREE.MeshStandardMaterial({ color: 0xc6ff5e });

    this.coins = positions.map((pos) => {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos.x, pos.y, pos.z);
      scene.add(mesh);
      return { mesh, active: true, respawnAt: 0 };
    });
  }

  update(playerPosition, onCollect) {
    const now = performance.now();

    for (const coin of this.coins) {
      if (coin.active) {
        coin.mesh.rotation.y += 0.05;

        const dist = coin.mesh.position.distanceTo(playerPosition);
        if (dist < 0.6) {
          coin.active = false;
          coin.mesh.visible = false;
          coin.respawnAt = now + RESPAWN_DELAY;
          onCollect();
        }
      } else if (now >= coin.respawnAt) {
        coin.active = true;
        coin.mesh.visible = true;
      }
    }
  }
}