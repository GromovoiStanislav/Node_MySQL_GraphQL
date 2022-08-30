const Sequelize = require("sequelize");
DB_NAME = "node_todo";
USER_NAME = "root";
PASSWORD = "root";
OPTIONS = { host: "localhost", dialect: "mysql" };
const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, OPTIONS);
module.exports = sequelize;
