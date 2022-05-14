const httpCodes = require('http-status-codes').StatusCodes;

exports.handleError = (req, res, error) => {
    console.log(error)
    return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
        status: httpCodes.INTERNAL_SERVER_ERROR,
        message: 'something went wrong!'
    })
}