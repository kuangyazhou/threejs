<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      renderer: null,
      scene: null,
      camera: null,
      cube: null,
      // plane:
      gui: null,
      controls: null,
      stats: null,
      ambientLight: null,
      spotLight: null
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
      // 环境光
      this.ambientLight = new THREE.AmbientLight("#111111");
      this.scene.add(this.ambientLight);

      this.spotLight = new THREE.SpotLight("#ffffff");
      this.spotLight.position.set(15, 30, 10);

      this.spotLight.castShadow = true;
      this.scene.add(this.spotLight);
      let debug = new THREE.CameraHelper(this.spotLight.shadow.camera);
      this.scene.add(debug);
    },
    initModel() {
      let helper = new THREE.AxesHelper(30);
      this.scene.add(helper);

      let cubeGeometry = new THREE.CubeGeometry(10, 10, 10);
      let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff });
      this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      this.cube.position.x = 30;
      this.cube.position.y = 5;
      this.cube.position.z = -5;
      this.cube.castShadow = true;
      this.scene.add(this.cube);

      let planeGeometry = new THREE.PlaneGeometry(200, 200);
      let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xaaaaaa });
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
      // 如果使用animate方法时，将此函数删除
      //controls.addEventListener( 'change', render );
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      this.controls.enableDamping = true;
      //动态阻尼系数 就是鼠标拖拽旋转灵敏度
      //controls.dampingFactor = 0.25;
      //是否可以缩放
      this.controls.enableZoom = true;
      //是否自动旋转
      this.controls.autoRotate = false;
      //设置相机距离原点的最远距离
      this.controls.minDistance = 5;
      //设置相机距离原点的最远距离
      this.controls.maxDistance = 2000;
      //是否开启右键拖拽
      this.controls.enablePan = true;
    },
    initGUI() {
      this.gui = {
        ambientLight: "#111111", //环境光源
        spotLight: "#ffffff", //点光源
        lightY: 30, //灯光y轴的位置
        distance: 0, //点光源距离
        intensity: 1, //灯光强度
        visible: true, //是否可见
        angle: Math.PI / 3,
        castShadow: true,
        exponent: 30,
        target: "plane",
        debug: true
      };
      let dataGUI = new dat.GUI();
      dataGUI.addColor(this.gui, "ambientLight").onChange(e => {
        this.spotLight.color = new THREE.Color(e);
      });
      dataGUI.addColor(this.gui, "spotLight").onChange(e => {
        this.spotLight.color = new THREE.Color(e);
      });
      dataGUI.add(this.gui, "lightY", 0, 100).onChange(e => {
        // this.spotLight.position.y = this.gui.lightY;
        this.spotLight.position.y = e;
      });
      dataGUI.add(this.gui, "distance", 0, 200).onChange(e => {
        this.spotLight.distance = e;
      });
      dataGUI.add(this.gui, "intensity", 0, 5).onChange(e => {
        this.spotLight.intensity = e;
      });
      dataGUI.add(this.gui, "visible").onChange(e => {
        this.spotLight.visible = e;
      });
      dataGUI.add(this.gui, "angle", 0, Math.PI * 2).onChange(e => {
        this.spotLight.angle = e;
      });
      dataGUI.add(this.gui, "castShadow").onChange(e => {
        this.spotLight.castShadow = e;
      });
      dataGUI.add(this.gui, "exponent", 0, 100).onChange(e => {
        this.spotLight.exponent = e;
      });
      dataGUI.add(this.gui, "debug").onChange(e => {
        if (e) {
          this.gui.debug = new THREE.CameraHelper(this.spotLight.shadow.camera);

          this.scene.add(this.gui.debug);
        } else {
          this.scene.remove(this.gui.debug);
        }
      });
      dataGUI.add(this.gui, "target", ["plane", "cube"]).onChange(e => {
        switch (e) {
          case "plane":
            this.spotLight.target = this.plane;
            break;
          case "cube":
            this.spotLight.target = this.cube;
            break;
        }
      });
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    },
    animate() {
      this.render();
      this.stats.update();
      this.controls.update();
      requestAnimationFrame(this.animate);
    }
  }
};
</script>
