import { createApp } from "vue";
import { darwinStudioUiPlugin } from "@darwin-studio/ui-vue";

import App from "./App.vue";

createApp(App)
  .use(darwinStudioUiPlugin, {
    // Plugin options
    resetStyles: true, // default is true so you don't have to specify it explicitly
  })
  .mount("#app");
