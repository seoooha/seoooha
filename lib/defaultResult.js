const result = (
    resultState = false,
    statusCode = 404,
    msg = "잘못된 접근입니다.",
    data = null
) => {
    return {
        result: resultState,
        status: statusCode,
        msg: msg,
        data: data,
    };
}

module.exports = result;