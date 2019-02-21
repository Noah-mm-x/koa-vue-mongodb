import Vue from "vue";
import md5 from "js-md5";
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    user: {
        getName() {
            return localStorage.getItem('userName')
        },
        getPwd() {
            return localStorage.getItem('userPwd')
        }
    },
    mutations: {
        setUser(state, { name, pwd }) {
            localStorage.setItem('name', name)
            localStorage.setItem('pwd', pwd)
        }
    },
    actions: {
        userLogin(context, { name, pwd }) {
            const apiUrl = '/adminLogin'
            const params = {
                name: name,
                pwd: md5(pwd)
            };
            Vue.$http
                .post(apiUrl, params)
                .then(res => {
                    if (
                        res &&
                        res.data &&
                        res.data.code &&
                        res.data.code == 1
                    ) {
                        Vue.loading = false;
                        Vue.$Message.success({
                            content: "登录成功"
                        });
                        context.commit("setUser", { "name": name, "pwd": md5(pwd) });
                    } else {
                        Vue.loading = false;
                        Vue.$Message.error({
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

