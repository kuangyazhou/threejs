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
      this.camera.position.set(100, 100, 100);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));

      //灯光
      this.ambientLight = new THREE.AmbientLight(0x444444);
      this.scene.add(this.ambientLight);
      let light = new THREE.DirectionalLight(0xffffff);
      light.position.set(0, 50, 0);
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
      let mtlLoader = new THREE.MTLLoader();
      mtlLoader.setPath("/lib/assets/models/");
      mtlLoader.load("butterfly.mtl", e => {
        let obj = new THREE.OBJLoader();
        obj.setMaterials(e);
        obj.setPath("/lib/assets/models/");
        obj.load("butterfly.obj", item => {
          //获取两个翅膀的位置
          let wing2 = item.children[5];
          let wing1 = item.children[4];
          //设置两个翅膀的透明度
          wing1.material.opacity = 0.6;
          wing1.material.transparent = true;
          wing1.material.depthTest = false;
          wing1.material.side = THREE.DoubleSide;
          wing2.material.opacity = 0.6;
          wing2.material.depthTest = false;
          wing2.material.transparent = true;
          wing2.material.side = THREE.DoubleSide;
          //将模型缩放并添加到场景当中
          item.scale.set(100, 100, 100);
          this.scene.add(item);
        });
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
