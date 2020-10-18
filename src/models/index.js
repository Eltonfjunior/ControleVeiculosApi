import mongoose from 'mongoose';
import reservationModel from './reservationModel.js';
import carModel from './carlModel.js';
import driverModel from './driverModel.js';
import dotenv from 'dotenv';

/**
 * Faz a leitura do arquivo
 * ".env" por padrão
 */
dotenv.config();

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.reservationModel = reservationModel(mongoose);
db.carModel = carModel(mongoose);
db.driverModel = driverModel(mongoose);
export { db };
