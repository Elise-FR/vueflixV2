import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import vuetify from "@/plugins/vuetify"; // path to vuetify export
import VueToastr from "vue-toastr";

// import Movie from ".compenents//Movie.vue";

Vue.config.productionTip = false;
Vue.use(VueToastr, {
  defaultTimeout: 3000,
  defaultProgressBar: false,
  defaultProgressBarValue: 0,
  defaultType: "error",
  defaultPosition: "toast-top-right",
  defaultCloseOnHover: false,
  defaultStyle: { "background-color": "red" },
  defaultClassNames: ["animated", "zoomInUp"],
});
new Vue({
  router,
  render: (h) => h(App),
  vuetify,
}).$mount("#app");
