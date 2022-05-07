import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import "@kfonts/neodgm-code";
import { createPinia } from "pinia";

createApp(App).use(createPinia()).mount("#app");
