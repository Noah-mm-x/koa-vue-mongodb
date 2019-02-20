const statusCode = {
    SUCCESS:{
        code: 1,
        msg: 'ok'
    },
    NOT_DATA:{
        code: 100,
        msg: 'not data'
    },
    PARAM_IS_NULL:{
        code: 11,
        msg: 'param is null'
    },
    PARAM_ERROR:{
        code: 20,
        msg: 'param error'
    },
    USER_IS_ALREADY_EXISTED:{
        code: 90,
        msg: 'user is already existed'
    }
}
module.exports = statusCode;
