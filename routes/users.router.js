const express = require("express");
const { Users } = require("../models");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth-middleware");
const bcrypt = require("bcryptjs");
const router = express.Router();

// user 생성
router.post("/users/signup", async (req, res) => {
    // console.log(req.body);
    const { email, password, username, confirmPassword } = req.body;
    // console.log(email, password, username);
    const isExitUser = await Users.findOne({ where: { email } });

    if (isExitUser) {
        return res.status(400).json({ message: "이미 존재하는 이메일입니다." });
    }

    if (confirmPassword !== password) {
        return res
            .status(400)
            .json({ message: "동일한 비밀번호를 입력해주세요." });
    }

    if (password.length <= 5) {
        return res
            .status(400)
            .json({ message: "6자 이상 비밀번호를 입력해주세요." });
    }

    const salt = await bcrypt.genSalt(12);

    const hashPW = await bcrypt.hash(password, salt);

    await Users.create({ email, password: hashPW, username });
    const user = await Users.findOne({
        attributes: ["userId", "email", "username"],
        where: { email },
    });

    // status(201) 클라이언트 요청을 서버가 정상적으로 처리, 새로운 리소스 생김
    return res.status(201).json({ data: user });
});

// user login
router.post("/users/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });

    if (!user) {
        return res.status(400).json({ message: "존재하지 않는 이메일입니다." });
    }

    const check = await bcrypt.compare(password, user.password);

    if (!check) {
        return res
            .status(400)
            .json({ message: "비밀번호가 일치하지 않습니다." });
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
});

// logout
router.get("/users/logout", (req, res) => {
    // console.log(req.cookies);
    res.clearCookie("authorization");
    return res.status(200).json({
        message: "로그아웃 성공",
    });
});

// read user detail
router.get("/users/:userId", authMiddleware, async (req, res) => {
    const paramUserId = req.params.userId;
    const { userId } = res.locals.user;
    // console.log(req.cookies);
    const user = await Users.findOne({
        attributes: ["userId", "email", "username"],
        where: { userId },
    });

    // console.log(paramUserId, userId);
    if (Number(paramUserId) !== userId) {
        return res.status(400).json({ message: "인증되지 않은 사용자입니다." });
    }

    return res.status(201).json({ data: user });
});

module.exports = router;
