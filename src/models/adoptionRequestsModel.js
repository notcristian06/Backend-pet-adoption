import Sequelize from "sequelize";
import { db } from "../database/conexion.js";


const adoptionRequests = db.define("adoption_requests", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  pet_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'pets',  
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  adopter_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'adopters',  
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  request_date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW  
  },
  status: {
    type: Sequelize.ENUM('Pending', 'Approved', 'Rejected'),  // Restricción de valores permitidos
    allowNull: false,
    defaultValue: 'Pending'  // Valor por defecto
  },
  name_pet: {  
    type: Sequelize.STRING,
    allowNull: true
  },
  name_adopter: {  
    type: Sequelize.STRING,
    allowNull: true
  },
  comments: {  
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  timestamps: false  // Deshabilita 'createdAt' y 'updatedAt'
});


export { adoptionRequests }