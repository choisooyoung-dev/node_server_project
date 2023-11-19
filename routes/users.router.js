const express = require("express");
const { Users } = require("../models");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth-middleware");
const bcrypt = require("bcryptjs");
const router = express.Router();
const {
    EmailExistError,
    UsernameExistError,
    EmailNotExistError,
    PasswordMismatchError,
    UnauthUserError,
} = require("../lib/error-lists");
const {
    userSchemaValidation,
    userLoginSchemaValidation,
} = require("../lib/schema-validation");

// user 생성
router.post("/users/signup", async (req, res, next) => {
    try {
        // const { email, password, username, confirmPassword } = req.body;
        const { email, password, username, confirmPassword } =
            await userSchemaValidation.validateAsync(req.body);
        const isExitUser = await Users.findOne({ where: { email } });
        const isExitUsername = await Users.findOne({ where: { username } });

        if (isExitUser) {
            const error = new EmailExistError();
            throw error;
        }

        if (isExitUsername) {
            const error = new UsernameExistError();
            throw error;
        }

        if (confirmPassword !== password) {
            const error = new ConfirmPasswordMismatchError();
            throw error;
        }

        // if (password.length <= 5) {
        //     const error = new PasswordLengthError();
        //     throw error;
        // }

        const salt = await bcrypt.genSalt(12);

        const hashPW = await bcrypt.hash(password, salt);

        await Users.create({ email, password: hashPW, username });
        const user = await Users.findOne({
            attributes: ["userId", "email", "username"],
            where: { email },
        });

        // status(201) 클라이언트 요청을 서버가 정상적으로 처리, 새로운 리소스 생김
        return res.status(201).json({ data: user });
    } catch (error) {
        //const error = new
        next(error);
    }
});

// user login
router.post("/users/login", async (req, res, next) => {
    try {
        const { email, password } =
            await userLoginSchemaValidation.validateAsync(req.body);
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            const error = new EmailNotExistError();
            throw error;
        }

        const check = await bcrypt.compare(password, user.password);

        if (!check) {
            const error = new PasswordMismatchError();
            throw error;
        }
        // 정보 JWT 생성
        const token = jwt.sign(
            {
                userId: user.userId,
            },
            process.env.TOKEN_KEY,
            { expiresIn: "12h" } // 만료시간 12시간
        );

        res.cookie("authorization", `Bearer ${token}`);
        // console.log("login=>", req.cookies);
        return res.status(200).json({ message: "로그인 성공" });
    } catch (error) {
        next(error);
    }
});

// logout
router.get("/users/logout", authMiddleware, (req, res, next) => {
    try {
        // console.log(req.cookies);
        res.clearCookie("authorization");
        return res.status(200).json({
            message: "로그아웃 성공",
        });
    } catch (error) {
        next(error);
    }
});

// read user detail
router.get("/users/:userId", authMiddleware, async (req, res, next) => {
    try {
        const paramUserId = req.params.userId;
        const { userId } = res.locals.user;
        // console.log(req.cookies);
        const user = await Users.findOne({
            attributes: ["userId", "email", "username", "createdAt"],
            where: { userId },
        });

        // console.log(paramUserId, userId);
        if (Number(paramUserId) !== userId) {
            const error = new UnauthUserError();
            throw error;
        }

        return res.status(201).json({ data: user });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
