"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Products extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            // 1. Products 모델에서
            this.belongsTo(models.Users, {
                // 2. Users 모델에게 N:1 관계 설정을 합니다.
                targetKey: "userId", // 3. Users 모델의 userId 컬럼을
                foreignKey: "UserId", // 4. Products 모델의 UserId 컬럼과 연결합니다.
            });
        }
    }
    Products.init(
        {
            productId: {
                allowNull: false, // NOT NULL
                autoIncrement: true, // AUTO_INCREMENT
                primaryKey: true, // Primary Key (기본키)
                type: DataTypes.INTEGER,
                unique: true,
            },
            UserId: {
                allowNull: false, // NOT NULL
                type: DataTypes.INTEGER,
                unique: true,
            },
            title: {
                allowNull: false, // NOT NULL
                type: DataTypes.STRING,
            },
            price: {
                allowNull: false, // NOT NULL
                type: DataTypes.INTEGER,
            },
            content: {
                allowNull: false, // NOT NULL
                type: DataTypes.STRING,
            },
            createdAt: {
                allowNull: false, // NOT NULL
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                allowNull: false, // NOT NULL
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: "Products",
        }
    );
    return Products;
};
