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
      gui: null,
      controls: null,
      stats: null,
      ambientLight: null,
      pointLight: null
    };
  },
  mounted() {
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
    initGUI() {
      this.gui = {
        ambientLight: "#111111", //环境光源
        pointLight: "#ffffff", //点光源
        lightY: 30, //灯光y轴的位置
        cubeX: 5, //立方体的x轴位置
        cubeY: 5, //立方体的x轴位置
        cubeZ: -5 //立方体的z轴的位置
      };
      let dataGUI = new dat.GUI();
      dataGUI.addColor(this.gui, "ambientLight").onChange(e => {
        this.ambientLight.color = new THREE.Color(e);
      });
      dataGUI.addColor(this.gui, "pointLight").onChange(e => {
        this.pointLight.color = new THREE.Color(e);
      });

      dataGUI.add(this.gui, "lightY", 0, 100);
      dataGUI.add(this.gui, "cubeX", -30, 30);
      dataGUI.add(this.gui, "cubeY", -30, 30);
      dataGUI.add(this.gui, "cubeZ", -30, 30);
    },
    initLight() {
      this.ambientLight = new THREE.AmbientLight("#111111");
      this.pointLight = new THREE.PointLight("#ffffff");
      this.pointLight.position.set(15, 30, 10);
      this.pointLight.castShadow = true;
      this.scene.add(this.ambientLight);
      this.scene.add(this.pointLight);
    },
    initModel() {
      // this.cube=
      let helper = new THREE.AxesHelper(30);
      this.scene.add(helper);
      let cubeGeometry = new THREE.CubeGeometry(10, 10, 10);
      let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff });
      this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      this.cube.position.x = 5;
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
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      //动态阻尼系数 就是鼠标拖拽旋转灵敏度
      //controls.dampingFactor = 0.25;
      //是否可以缩放
      this.controls.enableZoom = true;
      //是否自动旋转
      this.controls.autoRotate = false;
      //设置相机距离原点的最远距离
      this.controls.minDistance = 50;
      //设置相机距离原点的最远距离
      this.controls.maxDistance = 200;
      //是否开启右键拖拽
      this.controls.enablePan = true;
    },

    render() {
      this.renderer.render(this.scene, this.camera);
    },
    animate() {
      this.render();
      this.stats.update();
      this.pointLight.position.y = this.gui.lightY;
      this.cube.position.x = this.gui.cubeX;
      this.cube.position.y = this.gui.cubeY;
      this.cube.position.z = this.gui.cubeZ;

      this.controls.update();
      requestAnimationFrame(this.animate);
    }
  }
};
</script>
