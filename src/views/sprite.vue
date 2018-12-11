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
      ambientLight: null,
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
      this.renderer.shadowMap.enabled = true;
      document.body.appendChild(this.renderer.domElement);

      this.scene = new THREE.Scene();

      // this.camera = new THREE.PerspectiveCamera(
      //   45,
      //   window.innerWidth / window.innerHeight,
      //   1,
      //   10000
      // );
      this.camera = new THREE.OrthographicCamera(-2000, 2000, 2000, -20000, 1, 1000);
      this.camera.position.set(100, 100, 100);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));

      this.ambientLight = new THREE.AmbientLight(0x404040);
      this.scene.add(this.ambientLight);

      let light = new THREE.DirectionalLight(0xffffff);
      light.position.set(1, 1, 1);
      this.scene.add(light);

      // this.spotLight = new THREE.SpotLight(0xfff);
      // this.spotLight.position.set(-40, 60, -10);
      // this.spotLight.castShadow = true;
      // this.scene.add(this.spotLight);

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
      this.controls.minDistance = 20;
      //设置相机距离原点的最远距离
      this.controls.maxDistance = 10000;
      //是否开启右键拖拽
      this.controls.enablePan = true;
    },
    initModel() {
      let helper = new THREE.AxesHelper(500);
      this.scene.add(helper);

      let material = new THREE.SpriteMaterial();
      for (let x = -5; x <= 5; x++) {
        for (let y = -5; y <= 5; y++) {
          for (let z = -5; z <= 5; z++) {
            let sprite = new THREE.Sprite(material);
            // for (let z = -5; z <= -5; z++) {
            sprite.position.set(x * 10, y * 10, z * 10);
            this.scene.add(sprite);
            // console.log(sprite);
            // }
          }
        }
        // for (let z = -5; z <= 5; z++) {
        //   let fuck = new THREE.Sprite(material);
        //   fuck.position.set(x * 10, 0, z * 10);
        //   this.scene.add(fuck);
        // }
      }
    },
    render() {
      this.renderer.render(this.scene, this.camera);
      this.controls.update();
      requestAnimationFrame(this.render);
    }
  }
};
</script>
