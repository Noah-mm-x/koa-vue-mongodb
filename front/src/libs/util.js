/*
 * @Author: MengFanxu 
 * @Date: 2019-01-10 12:25:28 
 * @Last Modified by: MengFanxu
 * @Last Modified time: 2019-01-10 14:53:50
 */
/**
 * 去除对象中不合法数据
 *
 * @param    {Object}  obj    需要处理的元素
 * @returns  Object
 *
 * @date     2019-01-10
 * @author   MengFanxu<15733225953@163.com>
 */
export function removeTheIllegalDataObject(obj) {
    let objTmp = {};
    for(let key in obj){
        let item = obj[key];
        if(item!=null && item!=""&&item!=undefined&&item!="undefined"){
            objTmp[key] = item;
        }
    }
    return objTmp;
}