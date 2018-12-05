<template>
  <div id="geo"></div>
</template>

<script>
import THREE from "three.js";

import ConvexGeometry from "@/js/libs/ConvexGeometry.js";
import ParametricGeometries from "@/js/libs/ParametricGeometries.js";
export default {
  created() {},
  mounted() {
    this.init();
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

      camera.position.x = -50;
      camera.position.y = -30;
      camera.position.z = -20;
      camera.lookAt(new THREE.Vector3(-10, 0, 0));

      const renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;

      //创建平面
      const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
      const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.receiveShadow = true;

      //rotate and position the plane
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.x = 0;
      plane.position.y = 0;
      plane.position.z = 0;

      scene.add(plane);

      //create the light
      const ambientLight = new THREE.AmbientLight(0x090909);
      scene.add(ambientLight);

      const spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(-40, 40, 50);
      spotLight.castShadow = true;
      scene.add(spotLight);

      this.addGeometries(scene);
      document.getElementById("geo").appendChild(renderer.domElement);
      render();
      function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
      }
    },
    addGeometries(scene) {
      let geoms = [];
      geoms.push(new THREE.CylinderGeometry(1, 4, 4));
      geoms.push(new THREE.BoxGeometry(2, 2, 2));
      geoms.push(new THREE.SphereGeometry(2));
      geoms.push(new THREE.IcosahedronGeometry(4));

      const points = [
        new THREE.Vector3(2, 2, 2),
        new THREE.Vector3(2, 2, -2),
        new THREE.Vector3(-2, 2, -2),
        new THREE.Vector3(-2, 2, 2),
        new THREE.Vector3(2, -2, 2),
        new THREE.Vector3(2, -2, -2),
        new THREE.Vector3(-2, -2, -2),
        new THREE.Vector3(-2, -2, 2)
      ];
      geoms.push(new THREE.ConvexGeometry(points));
      let pts = [];
      const detail = 0.1;
      const radius = 3;
      for (let angle = 0.0; angle < Math.PI; angle += detail) {
        pts.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            0,
            Math.sin(angle) * radius
          )
        );
      }

      pts.push(new THREE.LatheGeometry(pts, 12));

      geoms.push(new THREE.OctahedronGeometry(3));
      geoms.push(
        new THREE.ParametricGeometry(
          THREE.ParametricGeometries.mobius3d,
          20,
          10
        )
      );
      geoms.push(new THREE.TetrahedronGeometry(3));
      geoms.push(new THREE.TorusGeometry(3, 1, 10, 10));
      geoms.push(new THREE.TorusKnotGeometry(3, 0.5, 50, 20));
      let j = 0;
      for (var i = 0; i < geoms.length; i++) {
        var cubeMaterial = new THREE.MeshLambertMaterial({
          wireframe: true,
          color: Math.random() * 0xffffff
        });

        var materials = [
          new THREE.MeshLambertMaterial({
            color: Math.random() * 0xffffff,
            shading: THREE.FlatShading
          }),
          new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true })
        ];

        var mesh = THREE.SceneUtils.createMultiMaterialObject(
          geoms[i],
          materials
        );
        mesh.traverse(function(e){
          e.castShadow = true;
        });

        //var mesh = new THREE.Mesh(geoms[i],materials[i]);
        //mesh.castShadow=true;
        mesh.position.x = -24 + (i % 4) * 12;
        mesh.position.y = 4;
        mesh.position.z = -8 + j * 12;

        if ((i + 1) % 4 == 0) j++;
        scene.add(mesh);
      }
    }
  }
};
</script>

<style scoped>
</style>
