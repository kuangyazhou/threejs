<template>
  <!-- <h1>fuck the king~~~</h1> -->
  <div class="three" id="three"></div>
</template>

<script>
import three from "three.js";
export default {
  mounted() {
    let scene = new three.Scene();
    let camera = new three.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    let renderer = new three.WebGLRenderer();
    //设置画布大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    //加入到body
    document.body.appendChild(renderer.domElement);
    //第二步,创建几何体.

    let geometry = new three.BoxGeometry(1, 1, 1);
    let material = new three.MeshBasicMaterial({ color: 0x00ff00 });
    let cube = new three.Mesh(geometry, material);
    //加入到场景
    scene.add(cube);

    //设置相机位置
    camera.position.z = 5;

    //渲染循环
    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x+=0.1;
      cube.rotation.y+=0.1;
      renderer.render(scene, camera);
    }
    animate();
  }
};
</script>

<style scoped>
.three {
  width: 100%;
  height: 100%;
}
</style>
