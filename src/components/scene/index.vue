<template>
  <div ref="scene-container" class="scene-container"></div>
</template>
<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { compositions } from "@darwin-studio/ui-vue";

export default {
  name: "ThreeScene",

  setup() {
    const { windowHeight, windowWidth } = compositions.useWindowSize();

    return {
      windowHeight,
      windowWidth,
    };
  },

  mounted() {
    this.initScene();
  },

  watch: {
    windowHeight() {
      this.updateSceneSize();
    },
    windowWidth() {
      this.updateSceneSize();
    },
  },

  methods: {
    initScene() {
      // DON'T use reactivity API with Three.js !!
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        75,
        this.windowWidth / this.windowHeight,
        0.1,
        1000
      );

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(this.windowWidth, this.windowHeight);
      this.$refs["scene-container"].appendChild(this.renderer.domElement);

      this.addGrid();

      this.addOrbitControls();

      this.addLight();

      // this.addCube();

      // this.addTank();

      this.addUntitled();

      // this.camera.position.z = 5;
      this.camera.position.x = 10;
      this.camera.position.y = 10;
      // this.camera.rotation.y = 0.5;

      this.animate();
    },

    updateSceneSize() {
      this.camera.aspect = this.windowWidth / this.windowHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(this.windowWidth, this.windowHeight);
    },

    addOrbitControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.target.set(0, 0, 0);
    },

    addLight() {
      const light = new THREE.AmbientLight(0xffffff, 0.3); // soft white light
      light.position.y = 100;
      this.scene.add(light);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      this.scene.add(directionalLight);
    },

    addGrid() {
      this.grid = new THREE.GridHelper(100, 10, "#ff0000", "#0000ff");
      this.scene.add(this.grid);
    },

    animate() {
      requestAnimationFrame(this.animate);
      // this.cube.rotation.x += 0.01;
      // this.cube.rotation.y += 0.01;
      this.camera.position.y += 0.002;

      if (this.utitledModel) {
        this.utitledModel.position.z += -0.01;
      }

      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    },

    addCube() {
      const geometry = new THREE.BoxGeometry(5, 5, 5);
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        // wireframe: true,
      });
      this.cube = new THREE.Mesh(geometry, material);
      this.scene.add(this.cube);
    },

    addTank() {
      const loader = new GLTFLoader();
      loader.load(
        "/assets/models/tank.glb",
        (gltf) => {
          const object = gltf.scene;
          /* object.traverse((node) => {
            if (!node.isMesh) return;
            node.material.wireframe = true;
          }); */
          this.scene.add(object);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    },

    addUntitled() {
      const loader = new GLTFLoader();
      loader.load(
        "/assets/models/untitled.gltf",
        (gltf) => {
          this.utitledModel = gltf.scene;
          /* object.traverse((node) => {
            if (!node.isMesh) return;
            node.material.wireframe = true;
          }); */
          this.scene.add(this.utitledModel);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    },
  },
};
</script>

<style scoped lang="scss">
.scene-container {
  height: 100%;
  width: 100%;
}
</style>
