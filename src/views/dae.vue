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
      loaded: false,
      animation: null,
      stats: null
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

      let labelRender = new THREE.CSS2DRenderer();
      labelRender.setSize(window.innerWidth, window.innerHeight);
      labelRender.domElement.style.position = "absolute";
      labelRender.domElement.style.top = "0";
      labelRender.domElement.style.pointerEvents = "none";
      document.body.appendChild(labelRender.domElement);

      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.set(60, 30, 60);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));

      //灯光
      let ambientLight = new THREE.AmbientLight(0x444444);
      this.scene.add(ambientLight);
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

      // stats
      this.stats = new Stats();
      document.body.appendChild(this.stats.dom);
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

      let awdLoader = new THREE.AWDLoader();
      awdLoader.load("/lib/assets/models/awd/PolarBear.awd", geom => {
        geom.traverse(item => {
          if (item instanceof THREE.Mesh) {
            item.material = new THREE.MeshLambertMaterial({ color: 0x00ffff });
            // console.log(item.geometry);
          }
        });
        geom.rotation.y = Math.PI;
        geom.scale.set(0.1, 0.1, 0.1);
        geom.position.x = 50;
        this.scene.add(geom);
      });

      let assimLoader = new THREE.AssimpLoader();
      assimLoader.load(
        "/lib/models/assimp/octaminator/Octaminator.assimp",
        geom => {
          let obj = geom.object;
          obj.position.z = -10;
          obj.rotation.y = Math.PI;
          obj.scale.set(0.1, 0.1, 0.1);
          this.scene.add(obj);
          // console.log(geom.animation)
          obj.position.set(30, 20, 0);
          this.animation = geom.animation;
        }
      );

      let vrmlLoader = new THREE.VRMLLoader();
      vrmlLoader.load("/lib/models/vrml/house.wrl", geom => {
        geom.position.set(-30, 0, 0);
        this.scene.add(geom);
      });

      let babyLoader = new THREE.BabylonLoader();
      babyLoader.load("/lib/assets/models/babylon/skull.babylon", geom => {
        geom.traverse(item => {
          if (item instanceof THREE.Mesh) {
            item.material = new THREE.MeshPhongMaterial({
              color: 0xaabbdd
            });
            item.position.set(0, 20, 0);
            item.scale.set(0.2, 0.2, 0.2);
          }
        });
        this.scene.add(geom);
      });

      let pdbLoader = new THREE.PDBLoader();
      pdbLoader.load("/lib/models/molecules/caffeine.pdb", item => {
        let root = new THREE.Group();
        let offset = new THREE.Vector3();
        let geometryAtoms = item.geometryAtoms;
        let geometryBonds = item.geometryBonds;
        let json = item.json;
        let boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
        let sphereGeometry = new THREE.IcosahedronBufferGeometry(1, 2);
        geometryAtoms.computeBoundingBox();
        geometryAtoms.boundingBox.getCenter(offset).negate();
        geometryAtoms.translate(offset.x, offset.y, offset.z);
        geometryBonds.translate(offset.x, offset.y, offset.z);

        let positions = geometryAtoms.getAttribute("position");
        let colors = geometryAtoms.getAttribute("color");
        let position = new THREE.Vector3();
        let color = new THREE.Color();
        for (let i = 0; i < positions.count; i++) {
          position.x = positions.getX(i);
          position.y = positions.getY(i);
          position.z = positions.getZ(i);
          color.r = colors.getX(i);
          color.g = colors.getY(i);
          color.b = colors.getZ(i);
          let material = new THREE.MeshPhongMaterial({ color: color });
          let obj = new THREE.Mesh(sphereGeometry, material);
          obj.position.copy(position);
          obj.position.multiplyScalar(75);
          obj.scale.multiplyScalar(25);
          root.add(obj);
          let atom = json.atoms[i];
          let text = document.createElement("div");
          text.className = "label";
          text.style.color = `rbg${atom[3][0]},${atom[3][1]},${atom[3][2]}`;
          text.style.textShadow = "1px 1px 1px #000";
          text.textContent = atom[4];
          let label = new THREE.CSS2DObject(text);
          label.position.copy(obj.position);
          root.add(label);
        }
        positions = geometryBonds.getAttribute("position");
        let start = new THREE.Vector3();
        let end = new THREE.Vector3();
        for (let i = 0; i < positions.count; i += 2) {
          start.x = positions.getX(i);
          start.Y = positions.getY(i);
          start.z = positions.getZ(i);
          end.x = positions.getX(i + 1);
          end.y = positions.getY(i + 1);
          end.z = positions.getZ(i + 1);
          start.multiplyScalar(75);
          end.multiplyScalar(75);
          let object = new THREE.Mesh(
            boxGeometry,
            new THREE.MeshPhongMaterial(0xffffff)
          );
          object.position.copy(start);
          object.position.lerp(end, 0.5);
          object.scale.set(5, 5, start.distanceTo(end));
          object.lookAt(end);
          root.add(object);
        }
        root.scale.set(0.1, 0.1, 0.1);
        root.position.set(80, -20, 0);
        this.scene.add(root);
      });
    },
    render() {
      let step = 0.1;
      this.loaded ? (this.group.rotation.y += step) : "";
      this.animation ? this.animation.setTime(performance.now() / 1000) : "";
      this.controls.update();
      this.stats.update();
      requestAnimationFrame(this.render);
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>
