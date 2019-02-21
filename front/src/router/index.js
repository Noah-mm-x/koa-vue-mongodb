import Vue from "vue";
import Axios from "../libs/http"
import Router from "vue-router";
import Index from "@/components/Index";
import AddData from "@/components/AddData";
import AllData from "@/components/AllData";
import UpdateData from "@/components/UpdateData";
import Upload from "@/components/admin/Upload";
import Login from "@/components/Login";
import Register from "@/components/Register";
import AdminLogin from "@/components/admin/Login";
import AdminRegister from "@/components/admin/Register";

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
        },
        {
            path: "/register",
            name: "Register",
            component: Register
        },
        {
            path: "/adminLogin",
            name: "AdminLogin",
            component: AdminLogin
        },
        {
            path: "/adminRegister",
            name: "AdminRegister",
            component: AdminRegister
        },
    ]
});
router.beforeEach((to, from, next) => {
    const isRequireAuth = to.matched.some(item => { return item.meta.requireAuth });
    if (isRequireAuth) {
        const name = localStorage.getItem('adminUserName')
        const pwd = localStorage.getItem('adminUserPwd')
        const apiUrl = '/adminLogin'
        const params = {
            name: name,
            pwd: pwd
        };
        if(name && pwd){
            next()
        }else{
            next({
                path: "/adminLogin",
                query: { r: to.fullPath }
            })
        }
        // next不能异步
        // Axios.post(apiUrl, params)
        //     .then(res => {
        //         if (
        //             res &&
        //             res.data &&
        //             res.data.code &&
        //             res.data.code == 1
        //         ) {
        //             next()
        //         } else {
        //             next({
        //                 path: "/adminLogin",
        //                 query: { r: to.fullPath }
        //             })
        //             $Message.error({
        //                 content: res.data.msg,
        //                 duration: 2
        //             });
        //         }
        //     })
        //     .catch(err => {
        //         next()
        //         console.log("err", err);
        //     });

    } else {
        next()
    }
})
export default router;
