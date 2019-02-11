/*
 * @Author: MengFanxu 
 * @Date: 2019-01-07 20:33:21 
 * @Last Modified by: MengFanxu
 * @Last Modified time: 2019-02-11 18:59:48
 */
import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 5000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'text/html; charset=utf-8';           //配置请求头
// axios.defaults.baseURL = 'http://localhost:3000';   //配置接口地址
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : '/api';   //配置接口地址
console.log('process.env.API_ROOT',process.env.NODE_ENV);

export default {
    post(url,params = {},cookies={}){
        return new Promise((reslove,reject)=>{
            axios({
                method: 'post',
                url,
                data: params,
                // 下面这行会导致数据传输时是这种格式 type=1&name=2
                // data: params ? qs.stringify(params) : {},
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


