import { Sequelize } from "sequelize";

const db = new Sequelize("goods_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
