const { StatusCodes } = require('http-status-codes');
const LoginInfo = require('../models/login-info-model');
const User = require('../models/user-model');
const { handleError } = require('../utils/error-handler');
const config = require('../config');
const { getToken } = require('../middlewares/auth');

exports.login = async (req, res) => {
    try {
        let { email, password } = req.body
        let userAgent = req.headers['user-agent'] || null
        if (!email && !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: StatusCodes.BAD_REQUEST,
                message: 'email or mobile and password is required'
            })
        }
        let user = await findUser({ email, password })
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: StatusCodes.UNAUTHORIZED,
                message: 'invalid credentials'
            })
        }


        let loginInfo = await LoginInfo.findOne({  where: { userId: user.id } })
        let duration = loginInfo ? Date.now() - new Date(loginInfo.updatedAt) : null

        if (!loginInfo) {
            await LoginInfo.create({ userId: user.id, userAgent: userAgent, updatedAt: new Date() })
        } else if (duration != null && duration < config.expireTime && userAgent != loginInfo.browserAgent) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: StatusCodes.BAD_REQUEST,
                message: "existing session found for the user"
            })
        } else {
            await LoginInfo.update({ browserAgent: userAgent, updatedAt: new Date() }, { where: { userId: user.id } })
        }
        const token = await getToken({ userId: user.id, userAgent })
        return res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            token,
            data: user
        })
    } catch (error) {
        return handleError(req, res, error)
    }
}

exports.registerUser = async (req, res) => {
    try {
        let { email, mobile, password } = req.body
        if (!email && !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: StatusCodes.BAD_REQUEST,
                message: 'email or mobile and password is required'
            })
        }

        let user = await User.findOne({ where: { email } })
        if (user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: StatusCodes.BAD_REQUEST,
                message: 'email or mobile is already registered'
            })
        }
        await User.create({
            email, mobile, password
        })
        return res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: 'user is added'
        })
    } catch (error) {
        return handleError(req, res, error)
    }
}

const findUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { email, password } = data
            let user = await User.findOne({ attributes: ['id', 'email', 'mobile'], where: { email, password } })
            return resolve(user)
        } catch (error) {
            return reject(error)
        }
    });
}