<template>
  <div>
    <div id="container"></div>
    <div id="info">
      <a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> webgl - interactive - particles
    </div>
    <!-- 这是什么鬼，为啥要这样写 -->
    <script type="x-shader/x-vertex" id="vertexshader">
      attribute float size; attribute vec3 customColor; varying vec3 vColor; void main() { vColor = customColor; vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 ); gl_PointSize = size * ( 300.0 / -mvPosition.z ); gl_Position = projectionMatrix * mvPosition; }
    </script>
    <script type="x-shader/x-fragment" id="fragmentshader">
      uniform vec3 color; uniform sampler2D texture; varying vec3 vColor; void main() { gl_FragColor = vec4( color * vColor, 1.0 ); gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord ); if ( gl_FragColor.a
      < ALPHATEST ) discard; } </script>
  </div>
</template>
<script>
// var Stats = function() {
//   function h(a) {
//     c.appendChild(a.dom);
//     return a;
//   }
//   function k(a) {
//     for (var d = 0; d < c.children.length; d++)
//       c.children[d].style.display = d === a ? "block" : "none";
//     l = a;
//   }
//   var l = 0,
//     c = document.createElement("div");
//   c.style.cssText =
//     "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";
//   c.addEventListener(
//     "click",
//     function(a) {
//       a.preventDefault();
//       k(++l % c.children.length);
//     },
//     !1
//   );
//   var g = (performance || Date).now(),
//     e = g,
//     a = 0,
//     r = h(new Stats.Panel("FPS", "#0ff", "#002")),
//     f = h(new Stats.Panel("MS", "#0f0", "#020"));
//   if (self.performance && self.performance.memory)
//     var t = h(new Stats.Panel("MB", "#f08", "#201"));
//   k(0);
//   return {
//     REVISION: 16,
//     dom: c,
//     addPanel: h,
//     showPanel: k,
//     begin: function() {
//       g = (performance || Date).now();
//     },
//     end: function() {
//       a++;
//       var c = (performance || Date).now();
//       f.update(c - g, 200);
//       if (
//         c > e + 1e3 &&
//         (r.update(1e3 * a / (c - e), 100), (e = c), (a = 0), t)
//       ) {
//         var d = performance.memory;
//         t.update(d.usedJSHeapSize / 1048576, d.jsHeapSizeLimit / 1048576);
//       }
//       return c;
//     },
//     update: function() {
//       g = this.end();
//     },
//     domElement: c,
//     setMode: k
//   };
// };
// Stats.Panel = function(h, k, l) {
//   var c = Infinity,
//     g = 0,
//     e = Math.round,
//     a = e(window.devicePixelRatio || 1),
//     r = 80 * a,
//     f = 48 * a,
//     t = 3 * a,
//     u = 2 * a,
//     d = 3 * a,
//     m = 15 * a,
//     n = 74 * a,
//     p = 30 * a,
//     q = document.createElement("canvas");
//   q.width = r;
//   q.height = f;
//   q.style.cssText = "width:80px;height:48px";
//   var b = q.getContext("2d");
//   b.font = "bold " + 9 * a + "px Helvetica,Arial,sans-serif";
//   b.textBaseline = "top";
//   b.fillStyle = l;
//   b.fillRect(0, 0, r, f);
//   b.fillStyle = k;
//   b.fillText(h, t, u);
//   b.fillRect(d, m, n, p);
//   b.fillStyle = l;
//   b.globalAlpha = 0.9;
//   b.fillRect(d, m, n, p);
//   return {
//     dom: q,
//     update: function(f, v) {
//       c = Math.min(c, f);
//       g = Math.max(g, f);
//       b.fillStyle = l;
//       b.globalAlpha = 1;
//       b.fillRect(0, 0, r, m);
//       b.fillStyle = k;
//       b.fillText(e(f) + " " + h + " (" + e(c) + "-" + e(g) + ")", t, u);
//       b.drawImage(q, d + a, m, n - a, p, d, m, n - a, p);
//       b.fillRect(d + n - a, m, a, p);
//       b.fillStyle = l;
//       b.globalAlpha = 0.9;
//       b.fillRect(d + n - a, m, a, e((1 - f / v) * p));
//     }
//   };
// };
import THREE from "three.js";
// require("../js/WebGL.js");
import WEBGL from "../js/WebGL.js";
// require("../js/libs/stats.min.js");
import Stats from "../js/libs/stats.min.js";
export default {
  mounted() {
    if (WEBGL.isWebGLAvailable() === false) {
      document.body.appendChild(WEBGL.getWebGLErrorMessage());
    }
    var renderer, scene, camera, stats;
    var particles;
    var PARTICLE_SIZE = 20;
    var raycaster, intersects;
    var mouse, INTERSECTED;
    init();
    animate();
    function init() {
      var container = document.getElementById("container");
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      camera.position.z = 250;
      //
      var vertices = new THREE.BoxGeometry(200, 200, 200, 16, 16, 16).vertices;
      var positions = new Float32Array(vertices.length * 3);
      var colors = new Float32Array(vertices.length * 3);
      var sizes = new Float32Array(vertices.length);
      var vertex;
      var color = new THREE.Color();
      for (var i = 0, l = vertices.length; i < l; i++) {
        vertex = vertices[i];
        vertex.toArray(positions, i * 3);
        color.setHSL(0.01 + 0.1 * (i / l), 1.0, 0.5);
        color.toArray(colors, i * 3);
        sizes[i] = PARTICLE_SIZE * 0.5;
      }
      var geometry = new THREE.BufferGeometry();
      geometry.addAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.addAttribute(
        "customColor",
        new THREE.BufferAttribute(colors, 3)
      );
      geometry.addAttribute("size", new THREE.BufferAttribute(sizes, 1));
      //
      var material = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(0xffffff) },
          texture: {
            value: new THREE.TextureLoader().load("textures/sprites/disc.png")
          }
        },
        vertexShader: document.getElementById("vertexshader").textContent,
        fragmentShader: document.getElementById("fragmentshader").textContent,
        alphaTest: 0.9
      });
      //
      particles = new THREE.Points(geometry, material);
      scene.add(particles);
      //
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);
      //
      raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2();
      //
      stats = new Stats();
      container.appendChild(stats.dom);
      //
      window.addEventListener("resize", onWindowResize, false);
      document.addEventListener("mousemove", onDocumentMouseMove, false);
    }
    function onDocumentMouseMove(event) {
      event.preventDefault();
      mouse.x = event.clientX / window.innerWidth * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function animate() {
      requestAnimationFrame(animate);
      render();
      stats.update();
    }
    function render() {
      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.001;
      var geometry = particles.geometry;
      var attributes = geometry.attributes;
      raycaster.setFromCamera(mouse, camera);
      intersects = raycaster.intersectObject(particles);
      if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].index) {
          attributes.size.array[INTERSECTED] = PARTICLE_SIZE;
          INTERSECTED = intersects[0].index;
          attributes.size.array[INTERSECTED] = PARTICLE_SIZE * 1.25;
          attributes.size.needsUpdate = true;
        }
      } else if (INTERSECTED !== null) {
        attributes.size.array[INTERSECTED] = PARTICLE_SIZE;
        attributes.size.needsUpdate = true;
        INTERSECTED = null;
      }
      renderer.render(scene, camera);
    }
  }
};
</script>

<style scoped>
body {
  color: #ffffff;
  background-color: #000000;
  margin: 0px;
  overflow: hidden;
}
#info {
  position: absolute;
  top: 0px;
  width: 100%;
  padding: 5px;
  font-family: Monospace;
  font-size: 13px;
  text-align: center;
  font-weight: bold;
}
a {
  color: #fff;
}
</style>
