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
      ambientLight: null
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
      this.camera.position.set(60, 30, 60);
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
      let helper = new THREE.AxesHelper(100);
      this.scene.add(helper);
    },
    initModel() {
      let loader = new THREE.PLYLoader();
      loader.load("/lib/models/ply/binary/Lucy100k.ply", item => {
        item.computeVertexNormals();
        let material = new THREE.MeshStandardMaterial({ color: 0x0055ff });
        let mesh = new THREE.Mesh(item, material);
        mesh.rotation.y = Math.PI;
        mesh.scale.set(0.02, 0.02, 0.02);
        this.scene.add(mesh);
        let position = item.getAttribute("position").array;
        item.localPosition = [];
        for (var i = 0; i < position.length; i++) {
          item.localPosition.push(position[i]);
        }
        this.initTween(item);
      });
    },
    initTween(geom) {
      let position = { y: 1 };
      let tween = new TWEEN.Tween(position).to({ y: 0 }, 5000);
      tween.easing(TWEEN.Easing.Sinusoidal.InOut);
      let tweenBack = new TWEEN.Tween(position).to({ y: 1 }, 5000);
      tweenBack.easing(TWEEN.Easing.Sinusoidal.InOut);
      tween.chain(tweenBack);
      tweenBack.chain(tween);

      let count = geom.getAttribute("position").count;
      // let minY = geom.boundingBox.min.y;
      let minY = -20;
      let onUpdate = function() {
        let y = this.y;
        let arr = [];
        for (let i = 0; i < count; i++) {
          arr.push(geom.localPosition[i * 3]);
          arr.push((geom.localPosition[i * 3 + 1] - minY) * y);
          arr.push(geom.localPosition[i * 3 + 2]);
        }
        geom.getAttribute("position").array = new Float32Array(arr);
        geom.getAttribute("position").needsUpdate = true;
      };
      tween.onUpdate(onUpdate);
      tweenBack.onUpdate(onUpdate);
      tween.start();
    },
    render() {
      this.controls.update();
      requestAnimationFrame(this.render);
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>
