<template>
  <div>
    <div id="stats"></div>
    <div id="scene"></div>
  </div>
</template>

<script>
// import THREE from "three.js";
// import Stats from "@/js/libs/stats.min.js";
// import {dat} from "@/js/libs/dat.gui.min.js";
// require('@/js/libs/stats.min.js');
export default {
  mounted() {
    this.init();
    // this.initStats();
  },
  methods: {
    init() {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer();
      // renderer.setClearColorHex();
      renderer.setClearColor(new THREE.Color(0xeeeeee), 1.0);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      const axes = new THREE.AxisHelper(20);
      scene.add(axes);
      const planeGeometry = new THREE.PlaneGeometry(60, 20);
      const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xccffcc });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.x = 15;
      plane.position.y = 0;
      plane.position.z = 0;
      plane.receiveShadow = true;
      scene.add(plane);

      const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
      const cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        wireframe: false //线框属性
      });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.x = -4;
      cube.position.y = 3;
      cube.position.z = 0;
      cube.castShadow = true;
      scene.add(cube);

      //添加灯光
      const spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(-40, 60, -10);
      spotLight.castShadow = true;
      scene.add(spotLight);

      const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
      const sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0x7777ff,
        wireframe: true
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.x = 20;
      sphere.position.y = 4;
      sphere.position.z = 2;
      sphere.castShadow = true;
      scene.add(sphere);

      camera.position.x = -30;
      camera.position.y = 40;
      camera.position.z = 30;
      camera.lookAt(scene.position);

      const controls = new function() {
        this.removeCube = function() {
          var allChildren = scene.children;
          var lastObject = allChildren[allChildren.length - 1];
          if (lastObject instanceof THREE.Mesh) {
            scene.remove(lastObject);
            this.numberOfObjects = scene.children.length;
          }
        };
        this.addCube = function() {
          var cubeSize = Math.ceil(Math.random() * 3);
          var cubeGeometry = new THREE.BoxGeometry(
            cubeSize,
            cubeSize,
            cubeSize
          );
          var cubeMaterial = new THREE.MeshLambertMaterial({
            color: Math.random() * 0xffffff
          });
          var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
          cube.castShadow = true;

          // position the cube randomly in the scene
          cube.position.x =
            -30 + Math.round(Math.random() * planeGeometry.parameters.width);
          cube.position.y = Math.round(Math.random() * 5);
          cube.position.z =
            -20 + Math.round(Math.random() * planeGeometry.parameters.height);

          // add the cube to the scene
          scene.add(cube);
          this.numberOfObjects = scene.children.length;
        };
      }();

      // var gui = new dat.GUI();
      // gui.add(controls, "addCube");
      // gui.add(controls, "removeCube").listen();

      document.getElementById("scene").appendChild(renderer.domElement);
      let step = 0;
      const stats = this.initStats();
      
      renderScene();
      // renderer.render(scene, camera);
      function renderScene() {
        // rotate the cube around its axes
        cube.rotation.x += 0.02;
        cube.rotation.y += 0.02;
        cube.rotation.z += 0.02;
        step += 0.04;
        sphere.position.x = 20 + 10 * Math.cos(step);
        sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
        stats.update();
      }
    },
    initStats() {
      const stats = new Stats();
      stats.setMode(0);
      stats.domElement.style.position = "absolute";
      stats.domElement.style.left = "30px";
      stats.domElement.style.top = "10px";
      document.getElementById("stats").appendChild(stats.domElement);

      return stats;
    }
  }
};
</script>


<style scoped>
</style>
