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
      controls: null,
      light: null,
      mixer: null,
      action: null
    };
  },
  created() {
    // this.draw();
  },
  methods: {
    draw() {
      this.init();
      this.initModel();
      this.render();
      this.initGUI();
    },
    init() {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setClearColor(0xeeeeee);
      this.renderer.shadowMap.enabled = true;
      document.body.appendChild(this.renderer.domElement);

      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      this.camera.position.set(100, 200, 300);

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xa0a0a0);
      this.scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

      this.scene.add(new THREE.AmbientLight(0x444444));
      this.light = new THREE.DirectionalLight(0xffffff);
      this.light.position.set(0, 200, 100);
      this.light.castShadow = true;
      this.light.shadow.camera.top = 180;
      this.light.shadow.camera.bottom = -100;
      this.light.shadow.camera.left = -120;
      this.light.shadow.camera.right = 120;
      this.light.castShadow = true;
      this.scene.add(this.light);

      this.scene.add(new THREE.AxesHelper(50));

      // 地板
      let mesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(2000, 2000),
        new THREE.MeshPhongMaterial({ color: 0xffffff, depthWrite: false })
      );
      mesh.rotation.x = -Math.PI / 2;
      mesh.receiveShadow = true;
      this.scene.add(mesh);

      // 地板线
      let grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
      grid.material.opacity = 0.2;
      grid.material.transparent = true;
      this.scene.add(grid);

      // controls
      this.controls = new THREE.OrbitControls(
        this.camera,
        this.renderer.domElement
      );
      this.controls.target.set(0, 100, 0);
      this.controls.enableDamping = true;
      //controls.dampingFactor = 0.25;
      this.controls.enableZoom = true;
      this.controls.autoRotate = false;
      this.controls.autoRotateSpeed = 0.5;
      this.controls.minDistance = 1;
      this.controls.maxDistance = 2000;
      this.controls.enablePan = true;
    },
    initModel() {
      // fpx模型
      let loader = new THREE.FBXLoader();
      let meshHelper = null;
      loader.load("/lib/models/fbx/Samba Dancing.fbx", mesh => {
        // console.log(mesh);
        meshHelper = new THREE.SkeletonHelper(mesh);
        this.scene.add(meshHelper);
        mesh.traverse(child => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // this.mixer = mesh.mixer = new THREE.AnimationMixer(mesh);
        // mesh.mixer = new THREE.AnimationMixer(mesh);
        // this.mixer = mesh.mixer;
        // this.action = this.mixer.clipAction(mesh.animations[0]);
        // this.action.play();
        // this.scene.add(mesh);
      });

      //dae模型
      let daeLoader = new THREE.ColladaLoader();
      daeLoader.load(
        "/lib/models/collada/stormtrooper/stormtrooper.dae",
        mesh => {
          console.log(mesh);
          let obj = mesh.scene;
          let meshHelper = new THREE.SkeletonHelper(obj);
          this.scene.add(meshHelper);
          obj.traverse(child => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          this.mixer = obj.mixer = new THREE.AnimationMixer(obj);
          this.action = this.mixer.clipAction(mesh.animations[0]);
          this.action.play();
          obj.rotation.z += Math.PI;
          this.scene.add(obj);
        }
      );
    },
    initGUI() {
      let gui = {
        animation: true
      };
      let datGUI = new dat.GUI();
      datGUI.add(gui, "animation").onChange(e => {
        if (e) {
          this.action.play();
        } else {
          this.action.stop();
        }
      });
    },
    render() {
      let clock = new THREE.Clock();
      let time = clock.getDelta();
      if (this.mixer) {
        this.mixer.update(time);
      }
      this.controls.update();
      requestAnimationFrame(this.render);
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>
