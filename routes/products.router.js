const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();
const { Users, Products, sequelize } = require("../models");
const { Op } = require("sequelize");
const {
    ProductsNotExistError,

    WrongPathError,
    ProductNotExistError,
    UnauthUserError,
} = require("../lib/error-lists");
const { productSchemaValidation } = require("../lib/schema-validation");

// 상품 글 생성
router.post("/products/new", authMiddleware, async (req, res, next) => {
    try {
        const { userId } = res.locals.user;

        const { title, content, price } =
            await productSchemaValidation.validateAsync(req.body);

        // if (!title || !content || price <= 0 || !status) {
        //     const error = new QuerySyntaxError();
        //     throw error;
        // }

        const product = await Products.create({
            UserId: userId,
            title,
            content,
            price,
        });

        return res.status(201).json({ data: product });
    } catch (error) {
        next(error);
    }
});

// 상품 글 목록 조회
router.get("/products", async (req, res, next) => {
    try {
        // url querystring
        const queryData = req.query.sort;
        let sortWord = "DESC";

        if (queryData === undefined || queryData.toLowerCase() === "desc") {
            sortWord = "DESC";
        } else if (queryData.toLowerCase() === "asc") {
            sortWord = "ASC";
        } else {
            const error = new WrongPathError();
            throw error;
        }

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
            order: [["createdAt", sortWord]],
        });

        if (!products) {
            const error = new ProductsNotExistError();
            throw error;
        }

        //console.log(products);
        return res.status(201).json({ data: products });
    } catch (error) {
        next(error);
    }
});

// 상품 상세 조회
router.get("/products/:productId", async (req, res, next) => {
    try {
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

        if (!product) {
            const error = new ProductNotExistError();
            throw error;
        }

        // console.log(product);
        return res.status(201).json({ data: product });
    } catch (error) {
        next(error);
    }
});

// 상품 수정
router.put("/products/:productId", authMiddleware, async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { userId } = res.locals.user;

        const { title, content, price, status } =
            await productSchemaValidation.validateAsync(req.body);

        const product = await Products.findOne({ where: { productId } });
        if (!product) {
            const error = new ProductNotExistError();
            throw error;
        } else if (product.UserId !== userId) {
            const error = new UnauthUserError();
            throw error;
        }

        const updateProduct = { title, content, price, status };
        await Products.update(updateProduct, {
            where: { [Op.and]: [{ productId }, { UserId: userId }] },
        });
        return res.status(201).json({ data: updateProduct });
    } catch (error) {
        next(error);
    }
});

// 상품 삭제
router.delete(
    "/products/:productId",
    authMiddleware,
    async (req, res, next) => {
        try {
            const { productId } = req.params;
            const { userId } = res.locals.user;

            const product = await Products.findOne({ where: { productId } });

            if (!product) {
                const error = new ProductNotExistError();
                throw error;
            } else if (product.UserId !== userId) {
                const error = new UnauthUserError();
                throw error;
            }

            // 삭제
            await Products.destroy({
                where: { [Op.and]: [{ productId }, { UserId: userId }] },
            });

            return res.status(200).json({ message: "상품이 삭제되었습니다." });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
