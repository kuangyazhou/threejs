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

      // 透视相机
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );

      // 正交相机
      // this.camera = new THREE.OrthographicCamera(
      //   window.innerWidth / -2,
      //   window.innerWidth / 2,
      //   window.innerHeight / 2,
      //   window.innerHeight / -2,
      //   1,
      //   1000
      // );
      this.camera.position.set(300, 300, 500);
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
            sprite.position.set(x * 10, y * 10, z * 10);
            this.scene.add(sprite);
          }
        }
      }

      let geom = new THREE.Geometry();
      let points = new THREE.PointCloudMaterial({
        size: 4,
        vertexColors: true,
        color: 0xffffff
      });

      for (let x = 10; x <= 20; x++) {
        for (let y = 10; y <= 20; y++) {
          for (let z = 10; z <= 20; z++) {
            let particle = new THREE.Vector3(x * 10, y * 10, z * 10);
            geom.vertices.push(particle);
            geom.colors.push(new THREE.Color(+this.randomColor()));
          }
        }
      }
      let cloud = new THREE.PointCloud(geom, points);
      this.scene.add(cloud);
    },
    render() {
      this.renderer.render(this.scene, this.camera);
      this.controls.update();
      requestAnimationFrame(this.render);
    },
    randomColor() {
      var arrHex = [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "a",
          "b",
          "c",
          "d",
          "e",
          "f"
        ],
        strHex = "0x",
        index;
      for (var i = 0; i < 6; i++) {
        index = Math.round(Math.random() * 15);
        strHex += arrHex[index];
      }
      return strHex;
    }
  },
  destroyed() {}
};
</script>
