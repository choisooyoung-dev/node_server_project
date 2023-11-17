const ErrorHandler = (err, req, res, next) => {
    console.log(err);

    // ------------------------------------------------------------------------------
    // TOKEN VALIDATION

    if (err.name === "TokenNotExistError") {
        return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    if (err.name === "TokenExpiredError") {
        res.clearCookie("authorization");
        return res
            .status(401)
            .json({ message: "인증이 만료되었습니다. 다시 인증해주세요." });
    }

    if (err.name === "TokenTypeMismatchError") {
        res.clearCookie("authorization");
        return res
            .status(401)
            .json({ message: "토큰 타입이 일치하지 않습니다." });
    }

    if (err.name === "TokenUserNotExistError") {
        res.clearCookie("authorization");
        return res
            .status(401)
            .json({ message: "토큰 사용자가 존재하지 않습니다." });
    }

    // ------------------------------------------------------------------------------
    // SIGNUP

    if (req.route.path === "/users/signup") {
        // console.log(err);
        if (err.name === "EmailExistError")
            return res
                .status(400)
                .json({ message: "이미 존재하는 이메일입니다." });

        if (err.name === "UsernameExistError")
            return res
                .status(400)
                .json({ message: "이미 존재하는 닉네임입니다." });

        if (err.name === "ConfirmPasswordMismatchError")
            return res
                .status(400)
                .json({ message: "동일한 비밀번호를 입력해주세요." });

        if (err.name === "PasswordLengthError")
            return res
                .status(400)
                .json({ message: "6자 이상 비밀번호를 입력해주세요." });
    }

    // ------------------------------------------------------------------------------
    // LOGIN

    if (req.route.path === "/users/login") {
        if (err.name === "EmailNotExistError")
            return res
                .status(400)
                .json({ message: "존재하지 않는 이메일입니다." });

        if (err.name === "PasswordMismatchError")
            return res
                .status(400)
                .json({ message: "비밀번호가 일치하지 않습니다." });
    }

    // ------------------------------------------------------------------------------
    // LOGOUT
    if (req.route.path === "/users/logout") {
        return res.status(400).json({ message: "이미 로그아웃 됐습니다." });
    }

    // ------------------------------------------------------------------------------
    // USER DETAIL

    if (req.route.path === "/users/:userId") {
        if (err.name === "UnauthUserError") {
            return res
                .status(400)
                .json({ message: "인증되지 않은 사용자 입니다." });
        }
    }

    // -------------------------------------------------------------------------------
    // PRODUCT
    // CREATE
    if (req.route.path === "/products/new") {
        if (err.name === "QuerySyntaxError") {
            return res
                .status(401)
                .json({ message: "데이터 형식이 올바르지 않습니다." });
        }
    }

    // READ
    if (req.route.path === "/products") {
        if (err.name === "WrongPathError") {
            return res.status(400).json({ message: "잘못된 경로 입니다." });
        }
        if (err.name === "ProductsNotExistError") {
            return res
                .status(404)
                .json({ message: "상품 전체 조회에 실패하였습니다." });
        }
    }

    if (req.route.path === "/products/:productId") {
        if (req.method === "GET") {
            if (err.name === "ProductNotExistError") {
                return res
                    .status(404)
                    .json({ message: "상품 조회에 실패하였습니다." });
            }
        }

        // UPDATE
        if (req.method === "PUT") {
            if (err.name === "ProductNotExistError") {
                return res
                    .status(404)
                    .json({ message: "상품 조회에 실패하였습니다." });
            }

            if (err.name === "UnauthUserError") {
                return res
                    .status(400)
                    .json({ message: "인증되지 않은 사용자 입니다." });
            }
        }

        // UPDATE
        if (req.method === "DELETE") {
            if (err.name === "ProductNotExistError") {
                return res
                    .status(404)
                    .json({ message: "상품 조회에 실패하였습니다." });
            }

            if (err.name === "UnauthUserError") {
                return res
                    .status(400)
                    .json({ message: "인증되지 않은 사용자 입니다." });
            }
        }
    }
};

module.exports = ErrorHandler;
