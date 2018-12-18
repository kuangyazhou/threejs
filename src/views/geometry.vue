<template>
  <div></div>
</template>
<script>
// import THREE from "three.js";
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
  mounted() {
    // let animate = function() {
    //   requestAnimationFrame(animate);
    //   for (let i = 0; i < this.scene.children.length; i++) {
    //     let item = this.scene.children[i];
    //     item.rotation.x = timer * 5;
    //     item.rotation.y = timer * 5;
    //   }
    this.draw();
    //   this.renderer.render(this.scene, this.camera);
    // };
    // animate();
  },
  methods: {
    init() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(this.width, this.height);
      document.body.appendChild(this.renderer.domElement);
      this.renderer.setClearColor(0x000000, 1.0);
    },
    initScene() {
      this.scene = new THREE.Scene();
    },
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(
        45,
        this.width / this.height,
        1,
        2000
      );
      // this.camera.position.x = 0;
      // this.camera.position.y = 400;
      // this.camera.position.x = 0;
      // this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    },
    initLight() {
      // 环境光
      let light = new THREE.AmbientLight(0xff0, 1.0, 0);
      light.position.set(0, 1, 0);
      this.scene.add(light);
      // 平衡光
      this.scene.add(new THREE.DirectionalLight(0xffffff));
    },
    initModel() {
      // 网格线
      // let geometry = new THREE.Geometry();
      // geometry.vertices.push(new THREE.Vector3(-500, 0, 0));
      // geometry.vertices.push(new THREE.Vector3(500, 0, 0));

      // for (let i = 0; i <= 20; i++) {
      //   let line = new THREE.Line(
      //     geometry,
      //     new THREE.LineBasicMaterial({ color: 0xff00ee, opacity: 1 })
      //   );
      //   line.position.z = i * 50 - 500;
      //   // this.scene.add(line);

      //   let lineY = new THREE.Line(
      //     geometry,
      //     new THREE.LineBasicMaterial({ color: 0xefedec, opacity: 1 })
      //   );
      //   lineY.position.x = i * 50 - 500;
      //   lineY.rotation.y = 90 * Math.PI / 180;
      //   this.scene.add(line, lineY);
      // }

      // 球形
      let object = new THREE.Mesh(new THREE.SphereGeometry(75, 20, 10));
      object.position.set(-400, 0, 200);
      this.scene.add(object);

      // 二十面
      let object1 = new THREE.Mesh(new THREE.IcosahedronGeometry(75, 0));
      object1.position.set(-200, 0, 200);
      this.scene.add(object1);

      // 八面体
      let object2 = new THREE.Mesh(new THREE.OctahedronGeometry(75, 0));
      object2.position.set(0, 0, 200);
      this.scene.add(object2);

      // 四面体
      let object3 = new THREE.Mesh(new THREE.TetrahedronGeometry(75, 0));
      object3.position.set(200, 0, 200);
      this.scene.add(object3);

      //长方形平面 （x轴宽度，y轴高度，x方向分段数，y方向分段数）
      let object4 = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 1, 1));
      object4.position.set(-400, 0, 0);
      this.scene.add(object4);

      //立方体 （x轴宽度，y轴高度，z轴深度，沿宽面分段数，沿高度面分段数，沿深度面分段数
      let object5 = new THREE.Mesh(
        new THREE.BoxGeometry(100, 100, 100, 1, 1, 1)
      );
      object5.position.set(-200, 0, 0);
      this.scene.add(object5);

      //圆形平面 （半径，顶点密度，绘制起点弧度，绘制弧度）
      let object6 = new THREE.Mesh(
        new THREE.CircleGeometry(50, 20, 0, Math.PI * 2)
      );
      object6.position.set(0, 0, 0);
      this.scene.add(object6);

      //空心圆平面 （内圆半径，外圆半径，分割面越大越圆滑，垂直外边分割面，开始绘制弧度，绘制弧度）
      let object7 = new THREE.Mesh(
        new THREE.RingGeometry(10, 50, 10, 5, 0, Math.PI * 2)
      );

      object7.position.set(200, 0, 0);

      this.scene.add(object7);

      // 圆柱 （头部圆的半径，底部圆半径，高度，上下圆顶点个数，上下面切割线条数，上下面是否显示，开始弧度，绘制弧度）
      let object8 = new THREE.Mesh(
        new THREE.CylinderGeometry(25, 75, 100, 40, 5)
      );
      object8.position.set(400, 0, 0);
      this.scene.add(object8);
    },
    render() {
      let timer = Date.now() * 0.0001;
      this.camera.position.x = Math.cos(timer) * 800;
      // this.camera.position.y = Math.tan(timer) * 300;
      this.camera.position.z = Math.sin(timer) * 800;
      this.camera.lookAt(this.scene.position);

      // this.camera.position.x = 0;
      // this.camera.position.y = 900;
      // this.camera.position.z = 0;
      // this.camera.lookAt(new THREE.Vector3(0, 0, 0));

      for (let i = 0; i < this.scene.children.length; i++) {
        let item = this.scene.children[i];
        // item.rotation.x = timer * 5;
        // item.rotation.y = timer * 2.5;
      }
      this.renderer.render(this.scene, this.camera);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.render();
    },
    draw() {
      this.init();
      this.initScene();
      this.initCamera();
      this.initLight();
      this.initModel();
      this.animate();
    }
  }
};
</script>
