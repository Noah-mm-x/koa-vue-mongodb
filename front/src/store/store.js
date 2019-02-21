import Vue from "vue";
import md5 from "js-md5";
import Vuex from 'vuex'
import Axios from "../libs/http"
import { Message} from 'iview';
const $Message = Message;

Vue.use(Vuex)

export default new Vuex.Store({
    user: {
        getAdminName() {
            return localStorage.getItem('adminUserName')
        },
        getAdminPwd() {
            return localStorage.getItem('adminUserPwd')
        }
    },
    mutations: {
        setAdminUser(state, { name, pwd }) {
            localStorage.setItem('adminUserName', name)
            localStorage.setItem('adminUserPwd', pwd)
        }
    },
    actions: {
        adminUserLogin(context, { name, pwd }) {
            const apiUrl = '/adminLogin'
            const params = {
                name: name,
                pwd: md5(pwd)
            };
            Axios.post(apiUrl, params)
                .then(res => {
                    if (
                        res &&
                        res.data &&
                        res.data.code &&
                        res.data.code == 1
                    ) {
                        $Message.success({
                            content: "登录成功"
                        });
                        context.commit("setAdminUser", { "name": name, "pwd": md5(pwd) });
                    } else {
                        $Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                })
                .catch(err => {
                    console.log("err", err);
                });
        }
    }
})

