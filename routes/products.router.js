const express = require("express");
const { Users, Products, sequelize } = require("../models");
const router = express.Router();

// 상품 글 생성
router.post("/products/new", async (req, res) => {
    // const { userId } = res.locals.user;
    const { title, content, price } = req.body;

    const product = await Products.create({
        UserId: 2,
        username: "쑤옹2",
        title,
        content,
        price,
    });

    return res.status(201).json({ data: product });
});

// 상품 글 목록 조회
router.get("/products", async (req, res) => {
    // 상품, 사용자 join
    const products = await Products.findAll({
        attributes: {
            indlcudes: [
                "productId",
                "title",
                "content",
                "status",
                "price",
                "createdAt",
                "updatedAt",
            ],
        },
        include: [
            {
                model: Users,
                attributes: ["username"],
            },
        ],
    });

    console.log(products);
    return res.status(200).json({ data: products });
});

// 상품 상세 조회
router.get("/products/:productId", async (req, res) => {
    const { productId } = req.params;

    // 상품, 사용자 join
    const product = await Products.findOne({
        attributes: {
            indlcudes: [
                "productId",
                "title",
                "content",
                "status",
                "price",
                "createdAt",
                "updatedAt",
            ],
        },
        include: [
            {
                model: Users,
                attributes: ["username"],
            },
        ],
        where: { productId },
    });

    console.log(product);
    return res.status(200).json({ data: product });
});

module.exports = router;
