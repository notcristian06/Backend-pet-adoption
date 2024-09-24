import Sequelize  from "sequelize";
import {db} from "../database/conexion.js";


const pets = db.define("pets", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true  
  },
  name: {  
    type: Sequelize.STRING,
    allowNull: true    
  },
  species: {
    type: Sequelize.STRING,
    allowNull: true
  },
  breed: {
    type: Sequelize.STRING,
    allowNull: true
  },
  age: {  
    type: Sequelize.INTEGER,
    allowNull: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  }
}, {
  timestamps: false  // Deshabilita 'createdAt' y 'updatedAt'
});


export {pets}