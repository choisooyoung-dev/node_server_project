const express = require("express");
const { Users, Products, sequelize } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");
const { Op } = require("sequelize");
const router = express.Router();

// 상품 글 생성
router.post("/products/new", authMiddleware, async (req, res) => {
    const { userId } = res.locals.user;

    const { title, content, price, status } = req.body;

    const product = await Products.create({
        UserId: userId,
        title,
        content,
        price,
        status,
    });

    return res.status(201).json({ data: product });
});

// 상품 글 목록 조회
router.get("/products", async (req, res) => {
    // 상품, 사용자 join
    const products = await Products.findAll({
        attributes: [
            "productId",
            [sequelize.col("username"), "username"],
            "title",
            "content",
            "status",
            "price",
            "createdAt",
            "updatedAt",
        ],
        include: [
            {
                model: Users,
                attributes: [],
            },
        ],
    });

    //console.log(products);
    return res.status(200).json({ data: products });
});

// 상품 상세 조회
router.get("/products/:productId", async (req, res) => {
    const { productId } = req.params;

    // 상품, 사용자 join
    const product = await Products.findOne({
        attributes: [
            "productId",
            [sequelize.col("username"), "username"],
            "title",
            "content",
            "status",
            "price",
            "createdAt",
            "updatedAt",
        ],
        include: [
            {
                model: Users,
                attributes: [],
            },
        ],
        where: { productId },
    });

    // console.log(product);
    return res.status(200).json({ data: product });
});

// 상품 수정
router.put("/products/:productId", authMiddleware, async (req, res) => {
    const { productId } = req.params;
    const { userId } = res.locals.user;
    const { title, content, price, status } = req.body;

    const product = await Products.findOne({ where: { productId } });
    if (!product) {
        return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
    } else if (product.UserId !== userId) {
        return res.status(401).json({ messgae: "권한이 없습니다." });
    }

    const updateProduct = { title, content, price, status };
    await Products.update(updateProduct, {
        where: { [Op.and]: [{ productId }, { UserId: userId }] },
    });
    return res.status(201).json({ data: updateProduct });
});

// 상품 삭제
router.delete("/products/:productId", authMiddleware, async (req, res) => {
    const { productId } = req.params;
    const { userId } = res.locals.user;

    const product = await Products.findOne({ where: { productId } });

    if (!product) {
        return res.status(404), json({ message: "상품이 존재하지 않습니다." });
    } else if (product.UserId !== userId) {
        return res.status(401).json({ message: "권한이 없습니다." });
    }

    // 삭제
    await Products.destroy({
        where: { [Op.and]: [{ productId }, { UserId: userId }] },
    });

    return res.status(200).json({ data: "상품이 삭제되었습니다." });
});

module.exports = router;
