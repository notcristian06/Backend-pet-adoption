import Sequelize  from "sequelize";

const db = new Sequelize("pets","mascotasaux","mascotas2024",{
    dialect: "mysql",
    host: "localhost"
});

export {db}
