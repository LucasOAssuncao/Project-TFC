import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken';
import UserController from '../controllers/UserController';

const login = Router();
const userController = new UserController();

login.post('/login', verifyToken);
login.get('/login/validate', userController.getRole);

export default login;
