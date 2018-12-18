<template>
  <div></div>
</template>
<script>
// import chairData from "../assets/chair.json";
const chairData = require("../assets/chair.json");
export default {
  data() {
    return {
      renderer: null,
      scene: null,
      camera: null,
      controls: null
    };
  },
  created() {
    this.draw();
  },
  methods: {
    draw() {
      this.init();
      this.initModel();
      this.render();
    },
    init() {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      // this.renderer.shadowMap.enabled = true;
      this.renderer.setClearColor(new THREE.Color(0xffffff));
      document.body.appendChild(this.renderer.domElement);

      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      this.camera.position.set(5, 5, 5);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));

      this.ambientLight = new THREE.AmbientLight(0x444444);
      this.scene.add(this.ambientLight);
      let light = new THREE.DirectionalLight(0xffffff);

      light.position.set(1, 1, 1);

      this.scene.add(light);

      this.controls = new THREE.OrbitControls(
        this.camera,
        this.renderer.domElement
      );
      this.controls.enableDamping = true;
      //controls.dampingFactor = 0.25;
      this.controls.enableZoom = true;
      this.controls.autoRotate = false;
      this.controls.minDistance = 5;
      this.controls.maxDistance = 10000;
      this.controls.enablePan = true;

      // 辅助线
      let helper = new THREE.AxesHelper(100);
      this.scene.add(helper);
    },
    initModel() {
      let loader = new THREE.ObjectLoader();
      // loader.load("http://localhost:2333/api/chair", e => {
      //   this.scene.add(e);
      // });
      loader.load("/lib/models/json/misc_chair01.json", e => {
        this.scene.add(e);
      });
    },
    render() {
      this.controls.update();
      requestAnimationFrame(this.render);
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>
