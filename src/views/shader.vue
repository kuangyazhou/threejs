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
      gui: null,
      cube: null,
      ambientLight: null,
      spotLight: null
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
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap.enabled = true;
      document.body.appendChild(this.renderer.domElement);

      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.set(30, 30, 30);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));

      this.ambientLight = new THREE.AmbientLight(0x0c0c0c);
      this.scene.add(this.ambientLight);

      this.spotLight = new THREE.SpotLight(0xfff);
      this.spotLight.position.set(-40, 60, -10);
      this.spotLight.castShadow = true;
      this.scene.add(this.spotLight);
    },
    initModel() {
      //创建立方体六个面的纹理
      let meshMaterial1 = this.createMaterial("vertex-shader", "fragment-shader-1");
      let meshMaterial2 = this.createMaterial("vertex-shader", "fragment-shader-2");
      let meshMaterial3 = this.createMaterial("vertex-shader", "fragment-shader-3");
      let meshMaterial4 = this.createMaterial("vertex-shader", "fragment-shader-4");
      let meshMaterial5 = this.createMaterial("vertex-shader", "fragment-shader-5");
      let meshMaterial6 = this.createMaterial("vertex-shader", "fragment-shader-6");
      let material = [
        meshMaterial6,
        meshMaterial5,
        meshMaterial4,
        meshMaterial3,
        meshMaterial2,
        meshMaterial1
      ];
      let cubeGeometry = new THREE.BoxGeometry(20, 20, 20);
      this.cube = new THREE.Mesh(cubeGeometry, material);
      this.scene.add(this.cube);
    },
    initGUI() {
      this.gui = {};
      let dataGUI = new dat.GUI();
    },
    render() {
      let step = 0;
      this.cube.rotation.y = step += 0.01;
      this.cube.rotation.x = step;
      this.cube.rotation.z = step;
      this.cube.material.forEach(e => {
        e.uniforms.time.value += 0.01;
      });

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render);
    },
    createMaterial(vertexShader, fragmentShader) {
        var vertShader = document.getElementById(vertexShader).innerHTML; //获取顶点着色器的代码
        var fragShader = document.getElementById(fragmentShader).innerHTML; //获取片元着色器的代码
        //配置着色器里面的attribute变量的值
        var attributes = {};
        //配置着色器里面的uniform变量的值
        var uniforms = {
            time: {type: 'f', value: 0.2},
            scale: {type: 'f', value: 0.2},
            alpha: {type: 'f', value: 0.6},
            resolution: {type: "v2", value: new THREE.Vector2(window.innerWidth, window.innerHeight)}
        };
        var meshMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            defaultAttributeValues : attributes,
            vertexShader: vertShader,
            fragmentShader: fragShader,
            transparent: true
        });
        return meshMaterial;
    }
  }
};
</script>
