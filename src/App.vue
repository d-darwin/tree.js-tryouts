<template>
  <transition name="scale" mode="out-in">
    <DButton
      v-if="!sceneLaunched"
      size="large"
      content="Launch Three.js scene"
      autofocus
      @click="launchScene"
    />
    <ThreeScene v-else />
  </transition>
</template>

<script>
import { DButton } from "@darwin-studio/ui-vue";
import ThreeScene from "./components/scene";

export default {
  name: "App",

  components: {
    DButton,
    ThreeScene,
  },

  data() {
    return {
      sceneLaunched: false,
    };
  },

  methods: {
    launchScene() {
      this.sceneLaunched = true;
    },
  },
};
</script>

<style lang="scss">
:root {
  --font-family: "Montserrat", sans-serif;
}

body {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style scoped lang="scss">
@import "~@darwin-studio/ui-vue/src/assets/styles/transitions/scale";
</style>
