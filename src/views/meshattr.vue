<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      scene: null,
      camera: null,
      ambientLight: null,
      directionalLight: null,
      cubeMaterial: null,
      spMaterial: null,
      controls: null,
      controlscontrols:null,
    };
  },
  created() {
    this.draw();
  },
  methods: {
    draw() {
      this.init();
      this.initModel();
      this.initGUI();
      this.render();
    },
    init() {
      // render
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap.enabled = true;
      document.body.appendChild(this.renderer.domElement);

      // 场景
      this.scene = new THREE.Scene();

      // 相机
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.set(0, 40, 100);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));

      // 灯光
      this.ambientLight = new THREE.AmbientLight("#111111");
      this.scene.add(this.ambientLight);
      this.directionalLight = new THREE.DirectionalLight("#fff");
      this.directionalLight.position.set(-40, 60, 100);
      this.directionalLight.shadow.camera.near = 20; //产生阴影的最近距离
      this.directionalLight.shadow.camera.far = 200; //产生阴影的最远距离
      this.directionalLight.shadow.camera.left = -50; //产生阴影距离位置的最左边位置
      this.directionalLight.shadow.camera.right = 50; //最右边
      this.directionalLight.shadow.camera.top = 50; //最上边
      this.directionalLight.shadow.camera.bottom = -50; //最下面
      this.directionalLight.shadow.mapSize.height = 1024;
      this.directionalLight.shadow.mapSize.width = 1024;
      this.directionalLight.castShadow = true;
      this.scene.add(this.directionalLight);

      // 添加辅助线
      let helper = new THREE.AxesHelper(30);
      this.scene.add(helper);
    },
    initModel() {
      // 方块
      let cubeGeometry = new THREE.CubeGeometry(20, 20, 20);
      this.cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff });
      let cube = new THREE.Mesh(cubeGeometry, this.cubeMaterial);
      cube.position.x = 30;
      cube.position.y = 5;
      cube.position.z = -5;
      this.scene.add(cube);

      // 球体
      let spGeometry = new THREE.SphereGeometry(10, 30, 10);
      this.spMaterial = new THREE.MeshLambertMaterial({ color: 0xaaafff });
      let sp = new THREE.Mesh(spGeometry, this.spMaterial);
      sp.position.set(-20, 20, 0);
      sp.castShadow = true;
      this.scene.add(sp);

      // 平面
      let planeGeometry = new THREE.PlaneGeometry(2000, 2000, 20, 20);
      let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xaaaaaa });
      let plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.y = -0;
      plane.receiveShadow = true;
      this.scene.add(plane);

      // controls
      this.controlscontrols = new THREE.OrbitControls(
        this.camera,
        this.renderer.domElement
      );
      // 如果使用animate方法时，将此函数删除
      //controls.addEventListener( 'change', render );
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      this.controlscontrols.enableDamping = true;
      //动态阻尼系数 就是鼠标拖拽旋转灵敏度
      this.controlscontrols.dampingFactor = 0.25;
      //是否可以缩放
      this.controlscontrols.enableZoom = true;
      //是否自动旋转
      this.controlscontrols.autoRotate = false;
      //设置相机距离原点的最远距离
      this.controlscontrols.minDistance = 50;
      //设置相机距离原点的最远距离
      this.controlscontrols.maxDistance = 200;
      //是否开启右键拖拽
      this.controlscontrols.enablePan = true;
    },
    initGUI() {
      this.controls = {
        rotationSpeed: 0.02,
        bouncingSpeed: 0.03,
        opacity: this.cubeMaterial.opacity,
        transparent: this.cubeMaterial.transparent,
        overdraw: this.cubeMaterial.overdraw,
        visible: this.cubeMaterial.visible,
        side: "front",
        color: this.cubeMaterial.color.getStyle(),
        wireframe: this.cubeMaterial.wireframe,
        wireframeLinewidth: this.cubeMaterial.wireframeLinewidth,
        wireFrameLineJoin: this.cubeMaterial.wireframeLinejoin
      };
      let dataGUI = new dat.GUI();
      let spGUI = dataGUI.addFolder("Mesh");
      spGUI.add(this.controls, "opacity", 0, 1).onChange(e => {
        this.cubeMaterial.opacity = e;
      });
      spGUI.add(this.controls, "transparent").onChange(e => {
        this.cubeMaterial.transparent = e;
      });
      spGUI.add(this.controls, "wireframe").onChange(e => {
        this.cubeMaterial.wireframe = e;
      });
      spGUI.add(this.controls, "wireframeLinewidth", 0, 20).onChange(e => {
        this.cubeMaterial.wireframeLinewidth = e;
      });
      spGUI.add(this.controls, "visible").onChange(e => {
        this.cubeMaterial.visible = e;
      });
      spGUI
        .add(this.controls, "side", ["front", "back", "double"])
        .onChange(e => {
          switch (e) {
            case "front":
              this.cubeMaterial.side = THREE.FrontSide;
              break;
            case "back":
              this.cubeMaterial.side = THREE.BackSide;
              break;
            case "double":
              this.cubeMaterial.side = THREE.DoubleSide;
              break;
          }
          this.cubeMaterial.needsUpdate = true;
        });
      spGUI.addColor(this.controls, "color").onChange(e => {
        this.cubeMaterial.color.setStyle(e);
      });
      spGUI.open();
    },
    render() {
      this.renderer.render(this.scene, this.camera);
      this.controlscontrols.update();
      requestAnimationFrame(this.render);
    }
  }
};
</script>
