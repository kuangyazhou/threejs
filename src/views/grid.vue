<template>
  <div id="canvas" style="width:100%;height:100%"></div>
</template>

<script>
import THREE from "three.js";
export default {
  data() {
    return {
      width: null,
      height: null,
      scene: null,
      renderer: null,
      camera: null
    };
  },
  created() {
    this.draw();
  },
  methods: {
    init() {
      // this.width = document.getElementById('canvas').clientWidth();
      // this.height = document.getElementById('canvas').clientHeight();
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(this.width, this.height);
      // document.getElementById("canvas").appendChild(renderer.domElement);
      document.body.appendChild(this.renderer.domElement);
      this.renderer.setClearColor(0xffffff, 1.0);
    },
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(
        70,
        this.width / this.height,
        1,
        1000
      );
      this.camera.position.x = 0;
      this.camera.position.y = 900;
      this.camera.position.z = 0;
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    },
    initScene() {
      this.scene = new THREE.Scene();
    },
    initLight() {
      const light = new THREE.DirectionalLight(0xff0000, 1.0, 0);
      light.position.set(100, 100, 200);
      this.scene.add(light);
    },
    initModel() {
      // const object = new THREE.AxisHelper(500);
      // this.scene.add(object);
      const geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3(-500, 0, 0));
      geometry.vertices.push(new THREE.Vector3(500, 0, 0));

      for (let i = 0; i <= 20; i++) {
        let line = new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({ color: 0xff00ee, opacity: 1 })
        );
        line.position.z = i * 50 - 500;
        // this.scene.add(line);

        let lineY = new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({ color: 0xefedec, opacity: 1 })
        );
        lineY.position.x = i * 50 - 500;
        lineY.rotation.y = 90 * Math.PI / 180;
        this.scene.add(line, lineY);
      }
    },
    draw() {
      this.init();
      this.initCamera();
      this.initScene();
      this.initLight();
      this.initModel();
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>

<style scoped>
</style>
