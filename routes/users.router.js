const express = require("express");
const { Users } = require("../models");
console.log(Users);

const router = express.Router();

// user 생성
router.post("/users", async (req, res) => {
    console.log(req.body);
    const { email, password, username } = req.body;
    console.log(email, password, username);
    const isExitUser = await Users.findOne({ where: { email } });

    if (isExitUser) {
        return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
    }

    const user = await Users.create({ email, password, username });

    return res.status(201).json({ message: "회원가입이 완료되었습니다." });
});

// user login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });

    if (!user) {
        return res.status(401).json({ message: "존재하지 않는 이메일입니다." });
    } else if (user.password !== password) {
        return res
            .status(401)
            .status({ message: "비밀번호가 일치하지 않습니다." });
    }

    return res.status(201).json({ message: "로그인 성공" });
});

module.exports = router;
