<template></template>
<script>
export default {
    data() {
        return {
            width: null,
            height: null,
            scene: null,
            renderer: null,
            camera: null,
            stats: null
        };
    },
    created() {
        this.draw();
    },
    methods: {
        init() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setSize(this.width, this.height);
            document.body.appendChild(this.renderer.domElement);
            this.renderer.setClearColor(0xffffff, 1.0);
        },
        initCamera() {},
        initScene() {},
        initLight() {},
        initModel() {},
        initStats() {
            this.stats = new Stats();
            this.stats.domElement.style.position = "absolute";
            this.stats.domElement.style.left = "0";
            this.stats.domElement.style.top = "0";
            this.stats.domElement.style.margin = 0;
            document.body.appendChild(this.stats.domElement);
        },
        draw() {
            this.init();
            this.initCamera();
            this.initScene();
            this.initLight();
            this.initModel();
            this.renderer.render(this.scene, this.camera);
        }
    }
};
</script>