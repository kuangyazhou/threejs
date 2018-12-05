<template>
  <div></div>
</template>

<script>
import THREE from "three.js";
export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 30);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      renderer.setSize(window.innerHeight, window.innerHeight, false);

      document.body.appendChild(renderer.domElement);

      const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

      var geometry = new THREE.Geometry();

      geometry.vertices.push(new THREE.Vector3(-10, 0, 0));

      geometry.vertices.push(new THREE.Vector3(0, 10, 0));

      geometry.vertices.push(new THREE.Vector3(10, 0, 0));

      const line = new THREE.Line(geometry, material);
      scene.add(line);

      renderer.render(scene, camera);
    }
  }
};
</script>

<style scoped>
</style>
