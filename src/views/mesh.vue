<template>
  <div></div>
</template>

<!--<script src="@/js/libs/dat.gui.min.js"></script> -->
<script>
import THREE from "three.js";
// import Stats from "../js/libs/stats.min.js";
// import OrbitControls from "../js/controls/OrbitControls.js";
// import {dat} from "@/js/libs/dat.gui.min.js";
export default {
  data() {
    return {
      renderer: null,
      camera: null,
      scene: null,
      stats: null,
      gui: null,
      light: null,
      setting: null,
      cube: null,
      controls: null
    };
  },
  created() {},
  methods: {
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
      this.setting = {
        positionX: 0,
        positionY: 5,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        translate: () => {
          this.cube.translateX(this.setting.translateX);
          this.cube.translateY(this.setting.translateY);
          this.cube.translateZ(this.setting.translateZ);

          this.setting.positionX = this.cube.position.x;
          this.setting.positionY = this.cube.position.y;
          this.setting.positionZ = this.cube.position.z;
        },
        visible: true
      };
      this.gui = new dat.GUI();

      let position = gui.addFolder("position");
      position.add(this.setting, "positionX", -30, 30).listen();
      position.add(this.setting, "positionY", -30, 30).listen();
      position.add(this.setting, "positionZ", -30, 30).listen();

      let scale = gui.addFolder("scale");
      scale.add(this.setting, "scaleX", 0.01, 5);
      scale.add(this.setting, "scaleY", 0.01, 5);
      scale.add(this.setting, "scaleZ", 0.01, 5);

      let rotation = gui.addFolder("rotation");
      rotation.add(this.setting, "rotationX", -2 * Math.PI, 2 * Math.PI);
      rotation.add(this.setting, "rotationY", -2 * Math.PI, 2 * Math.PI);
      rotation.add(this.setting, "rotationZ", -2 * Math.PI, 2 * Math.PI);

      let translate = gui.addFolder("translate");
      translate.add(this.setting, "translateX", -5.5);
      translate.add(this.setting, "translateY", -5.5);
      translate.add(this.setting, "translateZ", -5.5);
      translate.add(this.setting, "translate", -5.5);

      gui.add(this.setting, "visible");
    },
    initLight() {
      this.scene.add(new THREE.AmbientLight(0x444));
      this.light = new THREE.PointLight(0xfff);
      this.light.position.set(15, 30, 10);
      this.light.castShadow = true;
      this.scene.add(this.light);
    },
    initModel() {
      let helper = new THREE.AxisHelper(10);
      this.scene.add(helper);
      let cubeGeometry = new THREE.CubeGeometry(10, 10, 10);
      let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff });
      this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      this.cube.castShadow = true;
      this.scene.add(this.cube);

      let planeGeometry = new THREE.PlaneGeometry(100, 100);
      let planeMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
      let plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.position.x = -0.5 * Math.PI;
      plane.position.y = -0;

      plane.receiveShadow = true;
      this.scene.add(plane);
    },
    initStatus() {
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
      this.controls.minDistance = 100;
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
      this.cube.position.set(
        this.setting.positionX,
        this.setting.positionY,
        this.setting.positionZ
      );
      this.cube.scale.set(
        this.setting.scaleX,
        this.setting.scaleY,
        this.setting.scaleZ
      );
      this.cube.rotation.set(
        this.setting.rotationX,
        this.setting.rotationY,
        this.setting.rotationZ
      );
      this.cube.visible = this.setting.visible;
      this.controls.update();
      requestAnimationFrame(this.animate);
    },
    draw() {
      this.initScene();
      this.initRender();
      this.initGUI();
      this.initCamera();
      this.initLight();
      this.initModel();
      this.initControls();
      this.animate();
    }
  }
};
</script>
