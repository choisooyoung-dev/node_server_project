const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const {
    TokenNotExistError,
    TokenTypeMismatchError,
    TokenUserNotExistError,
} = require("../lib/error-lists");

module.exports = async (req, res, next) => {
    try {
        const { authorization } = req.cookies;

        // 토큰 값 받지 않았을 때, 로그인 필요 시
        if (!authorization) {
            const error = new TokenNotExistError(error);
            // throw error;
        }

        const [tokenType, token] = authorization.split(" ");
        // 토큰 타입이 일치하지 않을 때
        if (tokenType !== "Bearer") {
            const error = new TokenTypeMismatchError();
            throw error;
        }
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;
        const user = await Users.findOne({ where: { userId } });

        // 토큰 사용자가 존재하지 않을 때
        if (!user) {
            const error = new TokenUserNotExistError();
            throw error;
        }
        // console.log("res.locals.user => ", res.locals.user);
        res.locals.user = user;
        next();
    } catch (error) {
        next(error);
    }
};
