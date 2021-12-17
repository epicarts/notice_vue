import { createApp } from "vue";
import App from "./App.vue";
import mixins from "./mixins/mixins";
import router from "./router";
import store from "./store";

const app = createApp(App);

app.use(store);
app.use(router);
app.mixin(mixins);
app.mount("#app");
