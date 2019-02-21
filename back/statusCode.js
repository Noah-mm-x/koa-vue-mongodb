const statusCode = {
    SUCCESS:{
        code: 1,
        msg: '成功'
    },
    NOT_DATA:{
        code: 100,
        msg: '没有数据'
    },
    PARAM_IS_NULL:{
        code: 11,
        msg: '参数为空'
    },
    PARAM_ERROR:{
        code: 20,
        msg: '参数错误'
    },
    USER_IS_ALREADY_EXISTED:{
        code: 90,
        msg: '该用户已存在'
    }
}
module.exports = statusCode;
