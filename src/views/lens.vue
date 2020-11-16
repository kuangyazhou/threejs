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
      ambientLight: null,
      pointLight: null,
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
    render() {
      this.renderer.render(this.scene, this.camera);
      this.controls.update();
      requestAnimationFrame(this.render);
    },
    initModel() {
      this.generatePoints(120, 2, 2 * Math.PI);
    },
    generatePoints(segments, phiStart, phiLength) {
      let points = [];
      const height = 5;
      let count = 40;
      for (let i = 0; i < count; i++) {
        points.push(
          new THREE.Vector3(
            (Math.sin(i * 0.2) + Math.cos(i * 0.3)) * height + 12,
            i - count + count / 2,
            0
          )
        );
      }
      let spGroup = new THREE.Object3D();
      let material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: false,
      }); //声明顶点球体使用的纹理
      points.forEach((item) => {
        let spGeom = new THREE.SphereGeometry(0.2); //实例化球形几何体
        let spMesh = new THREE.Mesh(spGeom, material); //生成网格
        spMesh.position.copy(item); //将当前顶点的坐标位置赋值给当前球体
        spGroup.add(spMesh); //添加到对象当中
      });
      this.scene.add(spGroup);

      // 实例化一个THREE.LatheGeometry，并设置相关的信息
      let latheGeometry = new THREE.LatheGeometry(
        points,
        segments,
        phiStart,
        phiLength
      );
      let latheMesh = this.createMesh(latheGeometry);
      this.scene.add(latheMesh);
    },

    createMesh(geom) {
      //  实例化一个法向量的材质
      let meshMaterial = new THREE.MeshNormalMaterial();
      meshMaterial.side = THREE.DoubleSide; //设置两面都可见
      let wireFrameMat = new THREE.MeshBasicMaterial();
      wireFrameMat.wireframe = true; //把材质渲染成线框
      // 将两种材质都赋给几何体
      let mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [
        meshMaterial,
        wireFrameMat,
      ]);
      return mesh;
    },

    init() {
      // render
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.setClearColor(0x111111);
      this.renderer.gammaInput = true;
      this.renderer.gammaOutput = true;
      document.body.appendChild(this.renderer.domElement);

      //   camera
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.set(400, -600, 100);
      this.camera.lookAt(new THREE.Vector3(-400, 600, -100));

      //  scene
      this.scene = new THREE.Scene();

      // light
      this.ambientLight = new THREE.AmbientLight("#111111");
      this.scene.add(this.ambientLight);
      this.pointLight = new THREE.PointLight("#ffffff");
      this.pointLight.position.set(400, 600, -100);
      this.pointLight.castShadow = true;
      this.scene.add(this.pointLight);

      let directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(1, 1, 1);
      this.scene.add(directionalLight);

      // 添加 lens flares
      let textureLoader = new THREE.TextureLoader();

      let textureFlare0 = textureLoader.load(
        "/lib/textures/lensflare/lensflare0.png"
      );
      let textureFlare2 = textureLoader.load(
        "/lib/textures/lensflare/lensflare2.png"
      );
      let textureFlare3 = textureLoader.load(
        "/lib/textures/lensflare/lensflare3.png"
      );

      let flareColor = new THREE.Color(0xffffff);
      flareColor.setHSL(0.55, 0.9, 1.0);

      let lensFlare = new THREE.Lensflare();

      lensFlare.addElement(
        new THREE.LensflareElement(textureFlare0, 500, 0.0, flareColor)
      );

      lensFlare.addElement(new THREE.LensflareElement(textureFlare2, 512, 0.0));
      lensFlare.addElement(new THREE.LensflareElement(textureFlare2, 512, 0.0));
      lensFlare.addElement(new THREE.LensflareElement(textureFlare2, 512, 0.0));

      lensFlare.addElement(new THREE.LensflareElement(textureFlare3, 60, 0.6));
      lensFlare.addElement(new THREE.LensflareElement(textureFlare3, 70, 0.7));
      lensFlare.addElement(new THREE.LensflareElement(textureFlare3, 120, 0.9));
      lensFlare.addElement(new THREE.LensflareElement(textureFlare3, 70, 1.0));

      lensFlare.position.copy(this.pointLight.position);

      this.scene.add(lensFlare);

      this.scene.add(new THREE.AxesHelper(100));

      //球体
      let sphereGeometry = new THREE.SphereGeometry(10, 30, 30);
      let sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff });
      let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(50, 0,0);

      sphere.castShadow = true;

      this.scene.add(sphere);

      //立方体
      let cubeGeometry = new THREE.CubeGeometry(10, 10, 10);

      let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff });

      let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.x = 30;
      cube.position.y = 5;
      cube.position.z = -5;

      //告诉立方体需要投射阴影
      cube.castShadow = true;

      this.scene.add(cube);

      //底部平面
      let planeGeometry = new THREE.PlaneGeometry(5000, 5000, 20, 20);
      let planeMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });

      let plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.y = -0;

      //告诉底部平面需要接收阴影
      plane.receiveShadow = true;

      this.scene.add(plane);

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
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = 0.05;
      //设置相机距离原点的最远距离
      this.controls.minDistance = 1;
      //设置相机距离原点的最远距离
      this.controls.maxDistance = 200;
      //是否开启右键拖拽
      this.controls.enablePan = true;
    },
  },
};
</script>