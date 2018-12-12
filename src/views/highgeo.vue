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
      controls: null,
      group: null
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
      this.renderer.setClearColor(new THREE.Color(0x000000));
      document.body.appendChild(this.renderer.domElement);

      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      this.camera.position.set(50, 50, 50);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));

      this.ambientLight = new THREE.AmbientLight(0x404040);
      this.scene.add(this.ambientLight);
      let light = new THREE.DirectionalLight(0xffffff);

      light.position.set(1, 1, 1);

      this.scene.add(light);

      this.controls = new THREE.OrbitControls(
        this.camera,
        this.renderer.domElement
      );
      this.controls.enableDamping = true;
      //controls.dampingFactor = 0.25;
      this.controls.enableZoom = true;
      this.controls.autoRotate = false;
      this.controls.minDistance = 20;
      this.controls.maxDistance = 10000;
      this.controls.enablePan = true;
    },
    initModel() {
      let knot = null;
      let helper = new THREE.AxesHelper(100);
      this.scene.add(helper);
      this.controls = {
        radius: 13,
        tube: 1.7,
        radialSegments: 156,
        tubularSegments: 12,
        p: 3,
        q: 4,
        heightScale: 3.5,
        asParticles: false,
        rotate: false,
        redraw: () => {
          // if (knot) this.scene.remove(knot);
          let geom = new THREE.TorusKnotGeometry(
            this.controls.radius,
            this.controls.tube,
            Math.round(this.controls.radialSegments),
            Math.round(this.controls.tubularSegments),
            Math.round(this.controls.p),
            Math.round(this.controls.q),
            this.controls.heightScale
          );
          if (this.controls.asParticles) {
            knot = this.createPointCloud(geom);
          } else {
            knot = this.createMesh(geom);
          }
          this.scene.add(knot);
        }
      };
      this.controls.redraw();

      this.group = new THREE.Object3D();

      let sphereGeometry = new THREE.SphereGeometry(5, 200, 200);
      let sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xaaaaaa });
      let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.x = -5;
      sphere.position.y = 5;

      let cubeGeometry = new THREE.CubeGeometry(10, 10, 8);
      let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff });
      let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.x = 15;
      cube.position.y = 5;
      cube.position.z = -5;

      this.group.add(sphere);
      this.group.add(cube);

      let planeGeometry = new THREE.PlaneGeometry(100, 100);
      let planeMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
      let plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.y = -0;
      //告诉底部平面需要接收阴影
      plane.receiveShadow = true;
      this.scene.add(plane);
      this.scene.add(this.group);
    },
    render() {
      // console.log(this.scene.toJSON());
      let step = 0.02;
      this.group.rotation.x += step;
      this.group.rotation.y += step;
      this.group.rotation.zs += step;
      this.renderer.render(this.scene, this.camera);
      // this.controls.update();
      requestAnimationFrame(this.render);
    },
    generateSprite() {
      let canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      let context = canvas.getContext("2d");
      let gradient = context.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.2, "rgba(0,255,255,1)");
      gradient.addColorStop(0.4, "rgba(0,0,64,1)");
      gradient.addColorStop(1, "rgba(0,0,0,1)");

      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);

      let texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    },
    createCloud(geom) {
      let material = new THREE.PointCloudMaterial({
        color: 0xffffff,
        size: 3,
        transparent: true,
        blending: THREE.AdditiveBlending,
        map: this.generateSprite(),
        depthTest: false
      });

      let cloud = new THREE.Points(geom, material);
      cloud.sortParticles = true;
      return cloud;
    },
    createMesh(geom) {
      let meshMaterial = new THREE.MeshNormalMaterial({});
      meshMaterial.side = THREE.DoubleSide;

      let mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [
        meshMaterial
      ]);

      return mesh;
    }
  }
};
</script>
