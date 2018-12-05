<template>
  <div></div>
</template>

<script>
// import THREE from "three.js";
export default {
  data() {
    return {
      renderer: null,
      camera: null,
      scene: null,
      stats: null,
      gui: null,
      light: null,
      controls:null,
      sphere:null
    };
  },
  mounted() {
    this.draw();
  },
  methods: {
    initRender() {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap = true;
      document.body.appendChild(this.renderer.domElement);
    },
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.set(0, 40, 100);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    },
    initScene() {
      this.scene = new THREE.Scene();
    },
    initGUI() {
      this.gui = {
        lightY: 30,
        sphereX: 0,
        sphereZ: 0,
        cubeX: 25,
        cubeZ: -5
      };
      let dataGUi = new dat.GUI();
      dataGUi.add(this.gui, "lightY", 0, 100);
      dataGUi.add(this.gui, "sphereX", -30, 30);
      dataGUi.add(this.gui, "sphereZ", -30, 30);
      dataGUi.add(this.gui, "cubeX", 0, 60);
      dataGUi.add(this.gui, "cubeZ", -30, 30);
    },
    initLight() {
      this.scene.add(new THREE.AmbientLight(0x444444));
      this.light = new THREE.PointLight(0xffffff);
      this.light.position.set(15, 30, 10);
      this.light.castShadow = true;
      this.scene.add(this.light);
    },
    initModel() {
      let shereGeometry = new THREE.SphereGeometry(5, 200, 200);
      let shereMaterial = new THREE.MeshLambertMaterial({ color: 0xaaaaaa });
      this.sphere = new THREE.Mesh(shereGeometry, shereMaterial);
      this.sphere.position.y = 5;
      this.sphere.castShadow = true;
      this.scene.add(this.sphere);

      let spGeometry = new THREE.SphereGeometry(0.5, 20, 20);
      let spMaterial = new THREE.MeshPhysicalMaterial({ color: 0xffffff });
      let sp = new THREE.Mesh(spGeometry, spMaterial);
      sp.position.set(15, 30, 10);
      this.scene.add(sp);

      let helper = new THREE.AxesHelper(100);
      this.scene.add(helper);

      let cubeGeometry = new THREE.CubeGeometry(10, 10, 8);
      let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff });
      this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      this.cube.position.x = 25;
      this.cube.position.y = 5;
      this.cube.position.z = -5;
      this.cube.castShadow = true;
      this.scene.add(this.cube);

      let planeGeometry = new THREE.PlaneGeometry(100, 100);
      let planeMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
      let plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.y = -0;
      plane.receiveShadow = true;
      this.scene.add(plane);
    },
    initStats() {
      this.stats = new Stats();
      document.body.appendChild(this.stats.dom);
    },
    initControls() {
      this.controls = new THREE.OrbitControls(
        this.camera,
        this.renderer.domElement
      );
      this.controls.enableDamping = true;
      this.controls.enableZoom = true;
      this.controls.autoTotate = false;
      this.controls.minDistance = 100;
      this.controls.maxDistance = 200;
      this.controls.enablePen = true;
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    },
    animate() {
      this.stats.update();
      this.light.position.y = this.gui.lightY;
      this.sphere.position.x = this.gui.sphereX;
      this.sphere.position.z = this.gui.sphereZ;
      this.cube.position.x = this.gui.cubeX;
      this.cube.position.z = this.gui.cubeZ;
      this.controls.update()
      // console.log(this.controls);
      requestAnimationFrame(this.animate);
      this.render();
    },
    draw() {
      this.initRender();
      this.initScene();
      this.initCamera();
      this.initLight();
      this.initModel();

      this.initGUI();
      this.initControls();
      this.initStats();

      this.animate();
    }
  }
};
</script>
