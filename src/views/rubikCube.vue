<template></template>
<script>
const Goldenrod = "rgba(255,193,37,1)";
const DeepSkyBlue = "rgba(0,191,255,1)";
const White = "rgba(255,255,255,1)";
const Black = "rgba(0,0,0,1)";
const LimeGreen = "rgba(50,205,50,1)";
const Firebrick = "rgba(178,34,34,1)";
const Yellow = "rgba(255,255,0,1)";
let dx, dy, dz;
let rotateNormal;
let rotateR;
export default {
    data() {
        return {
            width: null,
            height: null,
            scene: null,
            renderer: null,
            camera: null,
            stats: null,
            meshes: [],
            raycaster: null
        };
    },
    created() {
        // this.draw();
    },
    methods: {
        init() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setSize(this.width, this.height);
            document.body.appendChild(this.renderer.domElement);
            this.renderer.setClearColor(0xffffff, 1.0);
            document.addEventListener("mousedown", onDocumentMouseDown, false);
            document.addEventListener(
                "touchstart",
                onDocumentTouchStart,
                false
            );
            document.addEventListener("mouseup", onDocumentMouseUp, false);
            document.addEventListener("touchend", onDocumentTouchEnd, false);
            window.addEventListener("resize", onWindowResize, false);
        },
        initCamera() {
            this.camera = new THREE.PerspectiveCamera(
                45,
                this.width / this.height,
                1,
                1000
            );
            camera.position.set(10, 6, 10);
            this.scene.add(this.camera);
            // this.camera.position.x = 10;
            // this.camera.position.y = 10;
            // this.camera.position.z = 10;
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        },
        initScene() {
            this.scene = new THREE.Scene();
        },
        initLight() {
            let light = new THREE.AmbientLight(0xfefefe);
            this.scene.add(light);
        },
        initModel() {
            // let geometry = new THREE.BoxGeometry(1, 1, 1);
            // let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            // let cube = new THREE.Mesh(geometry, material);
            let plane = new THREE.Mesh(
                new THREE.PlaneGeometry(6, 6),
                new THREE.MeshBasicMaterial({
                    color: 0x000000,
                    opacity: 0,
                    transparent: true
                })
            );
            plane.position.set(3.01, 0, 0);
            plane.rotation.y = Math.PI / 2;
            plane.name = "frontX";
            this.scene.add(plane);

            let plane1 = new THREE.Mesh(
                new THREE.PlaneGeometry(6.01, 6.01),
                new THREE.MeshBasicMaterial({
                    color: 0x000000,
                    opacity: 0,
                    transparent: true
                })
            );
            plane1.position.set(-3.01, 0, 0);
            plane1.rotation.y = -Math.PI / 2;
            plane1.name = "backX";
            this.scene.add(plane1);

            let plane2 = new THREE.Mesh(
                new THREE.PlaneGeometry(6.01, 6.01),
                new THREE.MeshBasicMaterial({
                    color: 0x000000,
                    opacity: 0,
                    transparent: true
                })
            );
            plane2.position.set(0, 0, 3.01);
            plane2.name = "frontZ";
            this.scene.add(plane2);

            let plane3 = new THREE.Mesh(
                new THREE.PlaneGeometry(6.01, 6.01),
                new THREE.MeshBasicMaterial({
                    color: 0x000000,
                    opacity: 0,
                    transparent: true
                })
            );
            plane3.position.set(0, 0, -3.01);
            plane3.rotation.y = Math.PI;
            plane3.name = "backZ";
            this.scene.add(plane3);

            let plane4 = new THREE.Mesh(
                new THREE.PlaneGeometry(6.01, 6.01),
                new THREE.MeshBasicMaterial({
                    color: 0x000000,
                    opacity: 0,
                    transparent: true
                })
            );
            plane4.position.set(0, 3.01, 0);
            plane4.rotation.x = -Math.PI / 2;
            plane4.name = "frontY";
            this.scene.add(plane4);

            let plane5 = new THREE.Mesh(
                new THREE.PlaneGeometry(6.01, 6.01),
                new THREE.MeshBasicMaterial({
                    color: 0x000000,
                    opacity: 0,
                    transparent: true
                })
            );
            plane5.position.set(0, -3.01, 0);
            plane5.rotation.x = Math.PI / 2;
            plane5.name = "backY";
            this.scene.add(plane5);

            let geometry = new THREE.CubeGeometry(2, 2, 2, 1, 1, 1);

            this.meshes.push(
                cubes(
                    2,
                    2,
                    2,
                    geometry,
                    Goldenrod,
                    Black,
                    DeepSkyBlue,
                    Black,
                    White,
                    Black
                )
            );
            this.meshes.push(
                cubes(
                    2,
                    0,
                    2,
                    geometry,
                    Goldenrod,
                    Black,
                    Black,
                    Black,
                    White,
                    Black
                )
            );
            this.meshes.push(
                cubes(
                    2,
                    -2,
                    2,
                    geometry,
                    Goldenrod,
                    Black,
                    Black,
                    Firebrick,
                    White,
                    Black
                )
            );
            this.meshes.push(
                cubes(
                    0,
                    2,
                    2,
                    geometry,
                    Black,
                    Black,
                    DeepSkyBlue,
                    Black,
                    White,
                    Black
                )
            );
            this.meshes.push(
                cubes(
                    0,
                    0,
                    2,
                    geometry,
                    Black,
                    Black,
                    Black,
                    Black,
                    White,
                    Black
                )
            );
            this.meshes.push(
                cubes(
                    0,
                    -2,
                    2,
                    geometry,
                    Black,
                    Black,
                    Black,
                    Firebrick,
                    White,
                    Black
                )
            );
            this.meshes.push(
                cubes(
                    -2,
                    2,
                    2,
                    geometry,
                    Black,
                    Yellow,
                    DeepSkyBlue,
                    Black,
                    White,
                    Black
                )
            );
            this.meshes.push(
                cubes(
                    -2,
                    0,
                    2,
                    geometry,
                    Black,
                    Yellow,
                    Black,
                    Black,
                    White,
                    Black
                )
            );
            this.meshes.push(
                cubes(
                    -2,
                    -2,
                    2,
                    geometry,
                    Black,
                    Yellow,
                    Black,
                    Firebrick,
                    White,
                    Black
                )
            );

            this.meshes.push(
                cubes(
                    2,
                    2,
                    0,
                    geometry,
                    Goldenrod,
                    Black,
                    DeepSkyBlue,
                    Black,
                    Black,
                    Black
                )
            );
            this.meshes.push(
                cubes(
                    2,
                    0,
                    0,
                    geometry,
                    Goldenrod,
                    Black,
                    Black,
                    Black,
                    Black,
                    Black
                )
            );
            this.meshes.push(
                cubes(
                    2,
                    -2,
                    0,
                    geometry,
                    Goldenrod,
                    Black,
                    Black,
                    Firebrick,
                    Black,
                    Black
                )
            );
            this.meshes.push(
                cubes(
                    0,
                    2,
                    0,
                    geometry,
                    Black,
                    Black,
                    DeepSkyBlue,
                    Black,
                    Black,
                    Black
                )
            );
            this.meshes.push(
                cubes(
                    0,
                    0,
                    0,
                    geometry,
                    Black,
                    Black,
                    Black,
                    Black,
                    Black,
                    Black
                )
            );
            this.meshes.push(
                cubes(
                    0,
                    -2,
                    0,
                    geometry,
                    Black,
                    Black,
                    Black,
                    Firebrick,
                    Black,
                    Black
                )
            );
            this.meshes.push(
                cubes(
                    -2,
                    2,
                    0,
                    geometry,
                    Black,
                    Yellow,
                    DeepSkyBlue,
                    Black,
                    Black,
                    Black
                )
            );
            this.meshes.push(
                cubes(
                    -2,
                    0,
                    0,
                    geometry,
                    Black,
                    Yellow,
                    Black,
                    Black,
                    Black,
                    Black
                )
            );
            this.meshes.push(
                cubes(
                    -2,
                    -2,
                    0,
                    geometry,
                    Black,
                    Yellow,
                    Black,
                    Firebrick,
                    Black,
                    Black
                )
            );

            this.meshes.push(
                cubes(
                    2,
                    2,
                    -2,
                    geometry,
                    Goldenrod,
                    Black,
                    DeepSkyBlue,
                    Black,
                    Black,
                    LimeGreen
                )
            );
            this.meshes.push(
                cubes(
                    2,
                    0,
                    -2,
                    geometry,
                    Goldenrod,
                    Black,
                    Black,
                    Black,
                    Black,
                    LimeGreen
                )
            );
            this.meshes.push(
                cubes(
                    2,
                    -2,
                    -2,
                    geometry,
                    Goldenrod,
                    Black,
                    Black,
                    Firebrick,
                    Black,
                    LimeGreen
                )
            );
            this.meshes.push(
                cubes(
                    0,
                    2,
                    -2,
                    geometry,
                    Black,
                    Black,
                    DeepSkyBlue,
                    Black,
                    Black,
                    LimeGreen
                )
            );
            this.meshes.push(
                cubes(
                    0,
                    0,
                    -2,
                    geometry,
                    Black,
                    Black,
                    Black,
                    Black,
                    Black,
                    LimeGreen
                )
            );
            this.meshes.push(
                cubes(
                    0,
                    -2,
                    -2,
                    geometry,
                    Black,
                    Black,
                    Black,
                    Firebrick,
                    Black,
                    LimeGreen
                )
            );
            this.meshes.push(
                cubes(
                    -2,
                    2,
                    -2,
                    geometry,
                    Black,
                    Yellow,
                    DeepSkyBlue,
                    Black,
                    Black,
                    LimeGreen
                )
            );
            this.meshes.push(
                cubes(
                    -2,
                    0,
                    -2,
                    geometry,
                    Black,
                    Yellow,
                    Black,
                    Black,
                    Black,
                    LimeGreen
                )
            );
            this.meshes.push(
                cubes(
                    -2,
                    -2,
                    -2,
                    geometry,
                    Black,
                    Yellow,
                    Black,
                    Firebrick,
                    Black,
                    LimeGreen
                )
            );

            this.meshes.forEach(item => {
                item.name = i;
                this.scene.add(item);
            });
        },
        initStats() {
            this.stats = new Stats();
            document.body.appendChild(this.stats.dom);
        },
        initControl() {
            let control = new THREE.OrbitControls(
                this.camera,
                this.renderer.domElement
            );
            control.target = new THREE.Vector3(0, 0, 0);
            this.raycaster = new THREE.Raycaster();
            let mouse = new THREE.Vector2();
        },
        draw() {
            this.init();
            this.initScene();
            this.initCamera();
            this.initLight();
            this.initModel();
            this.initStats();
            this.animate();
            // this.renderer.render(this.scene, this.camera);
        },
        animate() {
            this.renderer.render(this.scene, this.camera);
            this.stats.update();
            if (rotateStart) {
                facerotate(result, rotateNormal, rtime);
                startTime++;
                if (startTime == rtime) {
                    rotateStart = false;
                    for (var i in result) {
                        result[i].position.round();
                    }
                    result = [];
                }
            }
            requestAnimationFrame(this.animate);
        },
        cubes(
            x,
            y,
            z,
            geometry,
            side1Color,
            side2Color,
            side3Color,
            side4Color,
            side5Color,
            side6Color
        ) {
            x = x || 0;
            y = y || 0;
            z = z || 0;

            var materials = [];
            var myFaces = [];
            myFaces.push(faces(side1Color));
            myFaces.push(faces(side2Color));
            myFaces.push(faces(side3Color));
            myFaces.push(faces(side4Color));
            myFaces.push(faces(side5Color));
            myFaces.push(faces(side6Color));
            for (var i = 0; i < 6; i++) {
                var texture = new THREE.Texture(myFaces[i]);
                texture.needsUpdate = true;
                materials.push(
                    new THREE.MeshLambertMaterial({
                        map: texture
                    })
                );
            }
            mesh = new THREE.Mesh(
                geometry,
                new THREE.MeshFaceMaterial(materials)
            );
            mesh.position.x = x;
            mesh.position.y = y;
            mesh.position.z = z;
            return mesh;
        },
        onDocumentTouchStart(event) {
            event.preventDefault();

            event.clientX = event.touches[0].clientX;
            event.clientY = event.touches[0].clientY;
            this.onDocumentMouseDown(event);
        },
        onDocumentMouseDown(event) {
            event.preventDefault();

            this.mouse.x =
                (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
            this.mouse.y =
                -(event.clientY / this.renderer.domElement.clientHeight) * 2 +
                1;

            this.raycaster.setFromCamera(mouse, camera);

            const intersects = this.raycaster.intersectObjects(scene.children);
            if (intersects.length > 0) {
                //console.log(intersects);
                selectedfirst = intersects[1].object;
                facefirst = intersects[0].object;
                //console.log(facefirst.normal);
                transform = true;
                controller.enabled = false;
            }
        },
        onDocumentMouseUp(event) {
            event.preventDefault();

            this.mouse.x =
                (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
            this.mouse.y =
                -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

            this.raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children);
            if (transform) {
                if (intersects.length > 0) {
                    selectedlast = intersects[1].object;
                    facelast = intersects[0].object;
                    if (selectedlast != selectedfirst) {
                        result = faceselection(
                            selectedfirst,
                            facefirst,
                            selectedlast,
                            facelast,
                            meshes
                        );

                        startTime = 0;
                        rtime = 30;
                        rotateStart = true;
                    }
                }
                controller.enabled = true;
                transform = false;
            }
        },
        onDocumentTouchEnd(event) {
            event.preventDefault();
            event.clientX = event.changedTouches[0].clientX;
            event.clientY = event.changedTouches[0].clientY;
            onDocumentMouseUp(event);
        },
        faces(rgbaColor) {
            var canvas = document.createElement("canvas");
            canvas.width = 256;
            canvas.height = 256;
            var context = canvas.getContext("2d");
            if (context) {
                // 3
                context.fillStyle = "rgba(0,0,0,1)";
                context.fillRect(0, 0, 256, 256);
                context.rect(16, 16, 224, 224);
                context.lineJoin = "round";
                context.lineWidth = 16;
                context.fillStyle = rgbaColor;
                context.strokeStyle = rgbaColor;
                context.stroke();
                context.fill();
            } else {
                alert("您的浏览器不支持Canvas无法预览.\n");
            }
            return canvas;
        },
        facerotate(objects, axis, time) {
            var r = rotateR / time;
            var px;
            var py;
            var rz;
            var newx;
            var newy;
            if (axis.z == 1) {
                for (var i = 0; i < objects.length; i++) {
                    objects[i].up = axis;
                    px = objects[i].position.x;
                    py = objects[i].position.y;
                    rz = objects[i].rotation.z;
                    newx =
                        Math.pow(px * px + py * py, 0.5) *
                        Math.cos(r + Math.atan2(py, px));
                    newy =
                        Math.pow(px * px + py * py, 0.5) *
                        Math.sin(r + Math.atan2(py, px));
                    objects[i].position.x = newx;
                    objects[i].position.y = newy;
                    rotateAroundWorldAxis(objects[i], axis, r);
                }
            } else if (axis.y == 1) {
                for (var i = 0; i < objects.length; i++) {
                    objects[i].up = axis;
                    px = objects[i].position.x;
                    py = objects[i].position.z;
                    rz = objects[i].rotation.y;
                    newx =
                        Math.pow(px * px + py * py, 0.5) *
                        Math.cos(-r + Math.atan2(py, px));
                    newy =
                        Math.pow(px * px + py * py, 0.5) *
                        Math.sin(-r + Math.atan2(py, px));
                    objects[i].position.x = newx;
                    objects[i].position.z = newy;
                    rotateAroundWorldAxis(objects[i], axis, r);
                }
            } else if (axis.x == 1) {
                for (var i = 0; i < objects.length; i++) {
                    objects[i].up = axis;
                    px = objects[i].position.z;
                    py = objects[i].position.y;
                    rz = objects[i].rotation.x;
                    newx =
                        Math.pow(px * px + py * py, 0.5) *
                        Math.cos(-r + Math.atan2(py, px));
                    newy =
                        Math.pow(px * px + py * py, 0.5) *
                        Math.sin(-r + Math.atan2(py, px));
                    objects[i].position.z = newx;
                    objects[i].position.y = newy;
                    rotateAroundWorldAxis(objects[i], axis, r);
                }
            }
        },
        rotateAroundWorldAxis(object, axis, radians) {
            var rotWorldMatrix = new THREE.Matrix4();
            rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
            rotWorldMatrix.multiply(object.matrix); // pre-multiply
            object.matrix = rotWorldMatrix;
            object.rotation.setFromRotationMatrix(object.matrix);
        },
        faceselection(
            selectedfirst,
            facefirst,
            selectedlast,
            facelast,
            meshes
        ) {
            let radian = Math.PI / 2;
            let result = [];
            dx = selectedfirst.position.x - selectedlast.position.x;
            dy = selectedfirst.position.y - selectedlast.position.y;
            dz = selectedfirst.position.z - selectedlast.position.z;
            if (facefirst.id == facelast.id) {
                var name = facefirst.name;
                //console.log(name);
                if (name == "frontX") {
                    if (
                        Math.abs(dy) > Math.abs(dx) &&
                        Math.abs(dy) > Math.abs(dz)
                    ) {
                        for (var i = 0; i < meshes.length; i++) {
                            if (
                                meshes[i].position.z == selectedfirst.position.z
                            )
                                result.push(meshes[i]);
                        }
                        rotateNormal = new THREE.Vector3(0, 0, 1);
                        if (dy > 0) radian = -radian;
                    } else if (
                        Math.abs(dz) > Math.abs(dx) &&
                        Math.abs(dz) > Math.abs(dy)
                    ) {
                        for (var i = 0; i < meshes.length; i++) {
                            if (
                                meshes[i].position.y == selectedfirst.position.y
                            )
                                result.push(meshes[i]);
                        }
                        rotateNormal = new THREE.Vector3(0, 1, 0);
                        if (dz < 0) radian = -radian;
                    }
                } else if (name == "backX") {
                    if (
                        Math.abs(dy) > Math.abs(dx) &&
                        Math.abs(dy) > Math.abs(dz)
                    ) {
                        for (var i = 0; i < meshes.length; i++) {
                            if (
                                meshes[i].position.z == selectedfirst.position.z
                            )
                                result.push(meshes[i]);
                        }
                        rotateNormal = new THREE.Vector3(0, 0, 1);
                        if (dy < 0) radian = -radian;
                    } else if (
                        Math.abs(dz) > Math.abs(dx) &&
                        Math.abs(dz) > Math.abs(dy)
                    ) {
                        for (var i = 0; i < meshes.length; i++) {
                            if (
                                meshes[i].position.y == selectedfirst.position.y
                            )
                                result.push(meshes[i]);
                        }
                        rotateNormal = new THREE.Vector3(0, 1, 0);
                        if (dz > 0) radian = -radian;
                    }
                } else if (name == "frontY") {
                    if (
                        Math.abs(dx) > Math.abs(dz) &&
                        Math.abs(dx) > Math.abs(dy)
                    ) {
                        for (var i = 0; i < meshes.length; i++) {
                            if (
                                meshes[i].position.z == selectedfirst.position.z
                            )
                                result.push(meshes[i]);
                        }
                        rotateNormal = new THREE.Vector3(0, 0, 1);
                        if (dx < 0) radian = -radian;
                    } else if (
                        Math.abs(dz) > Math.abs(dx) &&
                        Math.abs(dz) > Math.abs(dy)
                    ) {
                        for (var i = 0; i < meshes.length; i++) {
                            if (
                                meshes[i].position.x == selectedfirst.position.x
                            )
                                result.push(meshes[i]);
                        }
                        rotateNormal = new THREE.Vector3(1, 0, 0);
                        if (dz > 0) radian = -radian;
                    }
                } else if (name == "backY") {
                    if (
                        Math.abs(dx) > Math.abs(dz) &&
                        Math.abs(dx) > Math.abs(dy)
                    ) {
                        for (var i = 0; i < meshes.length; i++) {
                            if (
                                meshes[i].position.z == selectedfirst.position.z
                            )
                                result.push(meshes[i]);
                        }
                        rotateNormal = new THREE.Vector3(0, 0, 1);
                        if (dx > 0) radian = -radian;
                    } else if (
                        Math.abs(dz) > Math.abs(dx) &&
                        Math.abs(dz) > Math.abs(dy)
                    ) {
                        for (var i = 0; i < meshes.length; i++) {
                            if (
                                meshes[i].position.x == selectedfirst.position.x
                            )
                                result.push(meshes[i]);
                        }
                        rotateNormal = new THREE.Vector3(1, 0, 0);
                        if (dz < 0) radian = -radian;
                    }
                } else if (name == "frontZ") {
                    if (
                        Math.abs(dx) > Math.abs(dz) &&
                        Math.abs(dx) > Math.abs(dy)
                    ) {
                        for (var i = 0; i < meshes.length; i++) {
                            if (
                                meshes[i].position.y == selectedfirst.position.y
                            )
                                result.push(meshes[i]);
                        }
                        rotateNormal = new THREE.Vector3(0, 1, 0);
                        if (dx > 0) radian = -radian;
                    } else if (
                        Math.abs(dy) > Math.abs(dz) &&
                        Math.abs(dy) > Math.abs(dx)
                    ) {
                        for (var i = 0; i < meshes.length; i++) {
                            if (
                                meshes[i].position.x == selectedfirst.position.x
                            )
                                result.push(meshes[i]);
                        }
                        rotateNormal = new THREE.Vector3(1, 0, 0);
                        if (dy < 0) radian = -radian;
                    }
                } else if (name == "backZ") {
                    if (
                        Math.abs(dx) > Math.abs(dz) &&
                        Math.abs(dx) > Math.abs(dy)
                    ) {
                        for (var i = 0; i < meshes.length; i++) {
                            if (
                                meshes[i].position.y == selectedfirst.position.y
                            )
                                result.push(meshes[i]);
                        }
                        rotateNormal = new THREE.Vector3(0, 1, 0);
                        if (dx < 0) radian = -radian;
                    } else if (
                        Math.abs(dy) > Math.abs(dz) &&
                        Math.abs(dy) > Math.abs(dx)
                    ) {
                        for (var i = 0; i < meshes.length; i++) {
                            if (
                                meshes[i].position.x == selectedfirst.position.x
                            )
                                result.push(meshes[i]);
                        }
                        rotateNormal = new THREE.Vector3(1, 0, 0);
                        if (dy > 0) radian = -radian;
                    }
                }
                rotateR = radian;
            }

            return result;
        }
    }
};
</script>