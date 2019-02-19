// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Axios from "./libs/http"

import FastClick from 'fastclick'
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.prototype.$http = Axios;
Vue.config.productionTip = false;

import { Button, Select, Option, Input, Table, Message, Page ,Upload,Icon} from 'iview';
Vue.component('Button', Button);
Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('Input', Input);
Vue.component('Table', Table);
Vue.component('Message', Message);
Vue.component('Page', Page);
Vue.component('Upload', Upload);
Vue.component('Icon', Icon);
Vue.prototype.$Message = Message;

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    components: { App },
    template: "<App/>"
});
