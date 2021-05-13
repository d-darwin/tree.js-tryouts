import { createApp } from "vue";
import { darwinStudioUiPlugin } from "@darwin-studio/ui-vue";

import App from "./App.vue";

createApp(App)
  .use(darwinStudioUiPlugin, {
    googleFonts: [
      {
        family: "Montserrat",
      },
    ],
  })
  .mount("#app");
