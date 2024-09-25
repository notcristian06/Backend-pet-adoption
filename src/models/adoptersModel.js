import Sequelize from "sequelize";
import { db } from "../database/conexion.js";


const adopters = db.define("adopters", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  timestamps: false  // Deshabilita 'createdAt' y 'updatedAt'
});


export { adopters }