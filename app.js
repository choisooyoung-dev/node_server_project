const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const usersRouter = require("./routes/users.router");
const { sequelize } = require("./models/index");
const productsRouter = require("./routes/products.router");
const ErrorHandler = require("./middlewares/error-middleware");
const app = express();

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("데이터베이스 연결됨.");
    })
    .catch((err) => {
        console.error(err);
    });

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev")); // 로그
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false })); // uri 파싱
app.use("/api", [usersRouter, productsRouter]);

// Error Handler
app.use(ErrorHandler);

// 서버 실행
app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기 중");
});
