import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import AddData from "@/components/AddData";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "Index",
            component: Index
        },
        {
            path: "/addData",
            name: "AddData",
            component: AddData
        }
    ]
});
