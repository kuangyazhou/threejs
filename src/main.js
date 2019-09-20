import Vue from "vue";

// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";
// Vue.use(ElementUI);
// const THREE = require("three");
// Vue.use(THREE);
// require('../src/js/libs/dat.gui.min.js');
// import "@/js/libs/dat.gui.min.js";
// import "@/js/libs/stats.min.js";
// import "@/js/controls/TrackballControls.js";
// import "@/js/controls/FlyControls.js";
// import "@/js/loaders/OBJLoader.js";
// import "@/js/loaders/MTLLoader.js";
// import "@/js/controls/OrbitControls.js";

Vue.config.productionTip = false;

Vue.prototype.$randomColor = function() {
    var arrHex = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "a",
            "b",
            "c",
            "d",
            "e",
            "f"
        ],
        strHex = "0x",
        index;

    for (var i = 0; i < 6; i++) {
        index = Math.round(Math.random() * 15);

        strHex += arrHex[index];
    }

    return strHex;
};

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");