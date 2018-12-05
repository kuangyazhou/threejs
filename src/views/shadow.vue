<template>
  <div></div>
</template>

<!-- <script src="../js/libs/stats.min.js"></script> -->
<script>
// import THREE from "three.js";
// import Stats from "../js/libs/stats.min.js";
// import TrackballControls from "../js/controls/TrackballControls.js";
export default {
  data() {
    return {
      width: null,
      height: null,
      scene: null,
      renderer: null,
      camera: null,
      light: null,
      stats: null,
      controls: null
    };
  },
  mounted() {
    this.draw();
  },
  methods: {
    init() {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.renderer.setSize(this.width, this.height);
      this.renderer.shadowMap.enabled = true;
      // this.renderer.shadowMap.type = new THREE.PCFSoftShadowMap();
      document.body.appendChild(this.renderer.domElement);
      // this.renderer.setClearColor(0x000, 1.0);
    },
    initScene() {
      this.scene = new THREE.Scene();
    },
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(
        45,
        this.width / this.height,
        0.1,
        1000
      );
      this.camera.position.set(0, 40, 100);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    },
    initLight() {
      this.scene.add(new THREE.AmbientLight(0x444444));
      this.light = new THREE.SpotLight(0xffffff);
      this.light.position.set(60, 30, 0);
      this.light.castShadow = true;
      this.scene.add(this.light);
    },
    initModel() {
      // 球体;
      let sphereGeometry = new THREE.SphereGeometry(5, 20, 20);
      let sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x7777ff });
      let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.y = 5;
      sphere.castShadow = true;
      this.scene.add(sphere);

      let helper = new THREE.AxisHelper(10);
      this.scene.add(helper);

      // 立方体
      let cubeGeometry = new THREE.CubeGeometry(10, 10, 8);
      let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff });
      let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.x = 25;
      cube.position.y = 5;
      cube.position.z = -5;
      cube.castShadow = true;
      this.scene.add(cube);

      // 底部平面
      let planeGeometry = new THREE.PlaneGeometry(100, 100);
      let planeMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
      let plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.position.x = -0.5 * Math.PI;
      plane.position.y = -0;
      plane.receiveShadow = true;
      this.scene.add(plane);
    },
    initStats() {
      this.stats = new Stats();
      document.body.appendChild(this.stats.dom);
    },
    initControls() {
      this.controls = new THREE.TrackballControls(this.camera);
      //旋转速度
      this.controls.rotateSpeed = 5;
      //变焦速度
      this.controls.zoomSpeed = 3;
      //平移速度
      this.controls.panSpeed = 0.8;
      //是否不变焦
      this.controls.noZoom = false;
      //是否不平移
      this.controls.noPan = false;
      //是否开启移动惯性
      this.controls.staticMoving = false;
      //动态阻尼系数 就是灵敏度
      this.controls.dynamicDampingFactor = 0.3;
      this.controls.addEventListener("change", this.render());
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    },
    animate() {
      this.render();
      requestAnimationFrame(this.animate);
      this.stats.update();
      this.controls.update();
    },
    draw() {
      this.init();
      this.initScene();
      this.initCamera();
      this.initLight();
      this.initModel();
      this.initControls();
      this.initStats();
      this.animate();
    }
  }
};
</script>
