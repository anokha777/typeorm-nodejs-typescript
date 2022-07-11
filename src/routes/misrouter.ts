import express from 'express';
import { testController } from '../controllers/testController';

export const misrouter = express.Router();

misrouter.route('/test').get(testController.getTest);

misrouter.route('/test').post(testController.saveTest);

misrouter.route('/test').put(testController.updateTest);

misrouter.route('/test').delete(testController.deleteTest);
