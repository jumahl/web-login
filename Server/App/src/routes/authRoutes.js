import { Router } from 'express';
import { register, login} from '../controllers/userController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token', resetPassword);

// Rutas protegidas
router.use(protect);

router.get('/me', getMe);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);
router.patch('/updatePassword', updatePassword);

// Rutas protegidas y restringidas a administradores
router.use(restrictTo('admin'));

router.get('/allUsers', getAllUsers);
router.patch('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);

export default router;