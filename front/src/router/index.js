import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import AddData from "@/components/AddData";
import AllData from "@/components/AllData";
import UpdateData from "@/components/UpdateData";
import Upload from "@/components/admin/Upload";
import Login from "@/components/Login";

Vue.use(Router);

let router = new Router({
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
            path: "/uploadImg",
            name: "AdminUpload",
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的        
            },
            component: Upload
        },
        {
            path: "/login",
            name: "Login",
            component: Login
        }
    ]
});
router.beforeEach((to, from, next) => {
    const isRequireAuth = to.matched.some(item => { return item.meta.requireAuth });
    if (isRequireAuth) {
        next({
            path: "/login",
            query: { r: to.fullPath }
        })
    } else {
        next()
    }
})
export default router;
