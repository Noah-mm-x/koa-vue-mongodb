/*
 * @Author: MengFanxu 
 * @Date: 2019-01-07 20:33:21 
 * @Last Modified by: MengFanxu
 * @Last Modified time: 2019-01-08 15:54:52
 */
import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 5000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'text/html; charset=utf-8';           //配置请求头
axios.defaults.baseURL = 'http://localhost:3000';   //配置接口地址

export default {
    post(url,params = {},cookies={}){
        return new Promise((reslove,reject)=>{
            axios({
                method: 'post',
                url,
                data: params ? qs.stringify(params) : {},
            }).then(res=>{
                reslove(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    get(url,params = {},cookies={}){
        return new Promise((reslove,reject)=>{
            axios({
                method: 'get',
                url,
                data: params ? params : {},
            }).then(res=>{
                reslove(res)
            }).catch(err=>{
                reject(err)
            })
        })
    }
}


