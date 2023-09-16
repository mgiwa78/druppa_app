import { createApp } from "vue";
import { createPinia } from "pinia";
import { Tooltip } from "bootstrap";
import App from "./App.vue";

/*
TIP: To get started with clean router change path to @/router/clean.ts.
 */
import router from "./router";
import ElementPlus from "element-plus";

//imports for app initialization
import { initVeeValidate } from "@/core/plugins/vee-validate";
import { initKtIcon } from "@/core/plugins/keenthemes";
import "@/core/plugins/prismjs";

import VueSocialSharing from "vue-social-sharing";

const app = createApp(App);

app.use(VueSocialSharing);
app.use(createPinia());
app.use(router);

app.use(ElementPlus);

initKtIcon(app);
initVeeValidate();

app.directive("tooltip", (el) => {
  new Tooltip(el);
});

app.mount("#app");
