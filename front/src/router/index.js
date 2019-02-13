import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import AddData from "@/components/AddData";
import AllData from "@/components/AllData";
import UpdateData from "@/components/UpdateData";
import Upload from "@/components/admin/Upload";

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
        },
        {
            path: "/allData",
            name: "AllData",
            component: AllData
        },
        {
            path: "/updateData",
            name: "UpdateData",
            component: UpdateData
        },
        {
            path: "/upload",
            name: "AdminUpload",
            component: Upload
        }
    ]
});
