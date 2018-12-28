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
      group: null,
      loaded: false
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
        0.1,
        1000
      );
      this.camera.position.set(60, 60, 60);
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
      var daeLoader = new THREE.ColladaLoader();
      daeLoader.load("/lib/assets/models/dae/Truck_dae.dae", result => {
        // console.log(result);
        let mesh = result.scene.children[0].clone();
        mesh.position.set(0, -30, 0);
        this.scene.add(mesh);
      });
      let loader = new THREE.STLLoader();
      loader.load("/lib/assets/models/SolidHead_2_lowPoly_42k.stl", e => {
        let mat = new THREE.MeshLambertMaterial({ color: 0x00ffff });
        let mesh = new THREE.Mesh(e, mat);
        mesh.rotation.x = -0.5 * Math.PI;
        mesh.scale.set(0.1, 0.1, 0.1);
        e.center();
        this.scene.add(mesh);
      });
      let ctmLoader = new THREE.CTMLoader();
      ctmLoader.load("/lib/assets/models/auditt_wheel.ctm", e => {
        let mat = new THREE.MeshLambertMaterial({ color: 0x00ee00 });
        this.group = new THREE.Mesh(e, mat);
        this.group.rotation.x = -Math.PI / 2;
        this.group.scale.set(20, 20, 20);
        this.group.position.x = 20;
        this.scene.add(this.group);
        this.loaded = true;
      });

      // console.log(THREE);
      let vtkLoader = new THREE.VTKLoader();
      vtkLoader.load("/lib/assets/models/moai_fixed.vtk", geom => {
        geom.computeFaceNormals();
        geom.computeVertexNormals();
        let mat = new THREE.MeshLambertMaterial({ color: 0xaa00ee });
        let group = new THREE.Mesh(geom, mat);
        group.scale.set(10, 10, 10);
        group.position.x = -10;
        this.scene.add(group);
      });

      let plyLoader = new THREE.PLYLoader();
      plyLoader.load("/lib/models/ply/binary/Lucy100k.ply", geom => {
        geom.computeFaceNormals();
        let material = new THREE.MeshStandardMaterial({
          color: 0x0055ff,
          flatShading: true
        });
        let mesh = new THREE.Mesh(geom, material);
        mesh.rotation.y = Math.PI;
        mesh.scale.set(0.05, 0.05, 0.05);
        mesh.position.set(-50, 0, 0);
        this.scene.add(mesh);
      });
    },
    render() {
      let step = 0.1;
      this.loaded ? (this.group.rotation.y += step) : "";
      this.controls.update();
      requestAnimationFrame(this.render);
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>
