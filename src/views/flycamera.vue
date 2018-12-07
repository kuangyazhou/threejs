<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      renderer: null,
      camera: null,
      scene: null,
      ambientLight: null,
      pointLight: null,
      stats: null,
      cube: null,
      controls: null,
      clock: null
    };
  },
  created() {
    this.draw();
  },
  methods: {
    draw() {
      this.initRender();
      this.initCamera();
      this.initScene();
      this.initLight();
      this.initModel();
      this.initStats();
      this.initControls();
      this.initGUI();

      this.animate();
    },
    initRender() {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap.enabled = true;
      // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.gammaInput = true;
      this.renderer.gammaOutput = true;
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
    initLight() {
      this.ambientLight = new THREE.AmbientLight("#111111");
      this.pointLight = new THREE.PointLight("#ffffff");
      this.pointLight.position.set(-40, 60, -10);
      this.pointLight.castShadow = true;
      this.scene.add(this.ambientLight);
      this.scene.add(this.pointLight);
    },
    initModel() {
      let helper = new THREE.AxesHelper(30);
      this.scene.add(helper);

      // 方块
      let cubeGeometry = new THREE.CubeGeometry(10, 10, 10);
      let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff });
      this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      this.cube.position.x = 30;
      this.cube.position.x = 5;
      this.cube.position.x = -5;
      this.scene.add(this.cube);

      // 球体
      let spGeometry = new THREE.SphereGeometry(10, 30, 30);
      let spMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff });
      let sp = new THREE.Mesh(spGeometry, spMaterial);
      sp.position.set(-20, 20, 0);
      sp.castShadow = true;
      this.scene.add(sp);

      let planeGeometry = new THREE.PlaneGeometry(200, 200);
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
      this.clock = new THREE.Clock();
      this.controls = new THREE.FlyControls(this.camera);
      this.controls.movementSpeed = 100; //设置移动的速度
      this.controls.rollSpeed = Math.PI / 12; //设置旋转速度
      this.controls.autoForward = false;
      this.controls.dragToLook = false;
    },
    initGUI() {},
    animate() {
      let delta = this.clock.getDelta();
      // console.log(new THREE.Clock());
      this.render();
      this.stats.update();
      this.controls.update(delta);
      requestAnimationFrame(this.animate);
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>
