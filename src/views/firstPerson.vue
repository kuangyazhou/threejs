<template>
  <div id="blocker">
    <div id="instructions">
      <span style="font-size:40px">点击屏幕开始</span>
      <br />
      <br /> (W, A, S, D = 移动, SPACE = 跳跃, MOUSE = 移动视角)
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      renderer: null,
      scene: null,
      camera: null,
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
      this.renderer.setPixelRatio(window.devicePixelRatio);
      // this.renderer.shadowMap.enabled = true;
      // this.renderer.setClearColor(new THREE.Color(0xffffff));
      this.renderer.sortObjects = false;
      document.body.appendChild(this.renderer.domElement);

      let clock = new THREE.Clock();
      let blocker = document.getElementById("blocker");
      let instructions = document.getElementById("instructions");
      let controlsEnabled = false;
      let moveForward = false;
      let moveBackward = false;
      let moveLef = false;
      let moveRight = false;
      let canJump = false;
      let spaceUp = true;
      //声明射线

      let upRaycaster = new THREE.Raycaster(
        new THREE.Vector3(),
        new THREE.Vector3(0, 1, 0),
        0,
        10
      );

      let horizontalRaycaster = new THREE.Raycaster(
        new THREE.Vector3(),
        new THREE.Vector3(),
        0,
        10
      );

      let downRaycaster = new THREE.Raycaster(
        new THREE.Vector3(),
        new THREE.Vector3(0, -1, 0),
        0,
        10
      );

      let velocity = new THREE.Vector3(); //移动速度变量
      let direction = new THREE.Vector3(); //移动的方向变量
      let rotation = new THREE.Vector3(); //当前的相机朝向
      let speed = 500;
      let upSpeed = 200;

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.set(0, 10, 50);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));

      //灯光
      let ambientLight = new THREE.AmbientLight(0x444444);
      this.scene.add(ambientLight);
      let light = new THREE.PointLight(0xffffff);
      light.position.set(0, 50, 0);
      light.castShadow = true;
      this.scene.add(light);
    },
    initModel() {
      let loader = new THREE.MTLLoader();
      loader.setPath("/lib/assets/models/");
      loader.load("city.mtl", item => {
        let objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(item);
        objLoader.setPath("/lib/assets/models/");
        objLoader.load("city.obj", obj => {
          let scale = chroma.scale(["yellow", "008ae5"]);
          this.setRandomColor(obj, scale);
          console.log(obj);
          this.scene.add(obj);
        });
      });
    },
    initControls() {
      this.controls = new THREE.PointerLockControls9(this.camera);
      this.controls.getObject().position.y = 50;
      this.controls.getObject().position.x = 100;
      this.scene.add(this.controls.getObject());
      let onKeyDown = function(event) {
        switch (event.keyCode) {
          case 38 || 87: // up
            this.moveForward = true;
            break;
          case 37 || 65: // left
            this.moveLeft = true;
            break;
          case 40 || 83: // down
            this.moveBackward = true;
            break;
          case 39 || 68: // right
            this.moveRight = true;
            break;
          case 32: // space
            if (canJump && spaceUp) velocity.y += upSpeed;
            this.canJump = false;
            this.spaceUp = false;
            break;
        }
      };
      let onKeyUp = function(event) {
        switch (event.keyCode) {
          case 38: // up
          case 87: // w
            this.moveForward = false;
            break;
          case 37: // left
          case 65: // a
            this.moveLeft = false;
            break;
          case 40: // down
          case 83: // s
            this.moveBackward = false;
            break;
          case 39: // right
          case 68: // d
            this.moveRight = false;
            break;
          case 32: // space
            this.spaceUp = true;
            break;
        }
      };
      document.addEventListener("keyup", onKeyUp, false);
      document.addEventListener("keydown", onKeyDown, false);
    },
    initPointerLock() {
      let havePointerLock =
        "pointerLockElement" in document ||
        "mozPointerLockElement" in document ||
        "webkitPointerLockElement" in document;
      if (havePointerLock) {
        let element = document.body;
      }
    },
    setRandomColor(obj, scale) {
      let children = obj.children;
      if (children && children.length > 0) {
        children.forEach(item => {
          this.setRandomColor(item, scale);
        });
      } else {
        if (obj instanceof THREE.Mesh) {
          if (Array.isArray(obj.material)) {
            for (let i = 0; i < obj.material.length; i++) {
              let material = obj.material[i];
              let color = scale(Math.random()).hex();
              if (material.name.indexOf("building") == 0) {
                material.color = new THREE.Color(color);
                material.transparent = true;
                material.opacity = 0.7;
                material.depthWrite = false;
              }
            }
          }
        } else {
          obj.material.color = new THREE.Color(scale(Math.random()).hex());
        }
      }
    },
    render() {
      this.renderer.clear();
      let clock = new THREE.Clock();
      this.controls.update(clock.getDelta());
      requestAnimationFrame(this.render);
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>
<style>
canvas {
  display: block;
}
#blocker {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
#instructions {
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: box;
  -webkit-box-orient: horizontal;
  -moz-box-orient: horizontal;
  /* box-orient: horizontal; */
  -webkit-box-pack: center;
  -moz-box-pack: center;
  /* box-pack: center; */
  -webkit-box-align: center;
  -moz-box-align: center;
  /* box-align: center; */
  color: #ffffff;
  text-align: center;
  cursor: pointer;
}
</style>
