import express from 'express'
import{
    register,
    login,
    forgotPassword,
    resetPassword,
    getProfil
} from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'


const router = express.Router()

// publics Road
router.post('/register',register)
router.post('/login',login)
router.post('/forgot-password',forgotPassword)
router.post('/reset-password/:token',resetPassword)

// secure Road (with token obligation)
router.get('/profile',protect,getProfil)

export default router
