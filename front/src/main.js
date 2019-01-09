// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Axios from "./libs/http"

Vue.prototype.$http = Axios;
Vue.config.productionTip = false;

import { Button, Select, Option, Input, Table,Message } from 'iview';
Vue.component('Button', Button);
Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('Input', Input);
Vue.component('Table', Table);
Vue.component('Message', Message);
Vue.prototype.$Message = Message;

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    components: { App },
    template: "<App/>"
});
