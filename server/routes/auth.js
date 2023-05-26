import { Router } from 'express'
import { register, login, getMe } from '../controllers/auth.js'
import { checkAuth } from '../utils/checkAuth.js'
const router = new Router()

// Register /api/auth/register
router.post('/register', register)

// Login /api/auth/login
router.post('/login', login)

// Get Me /api/auth/me
router.get('/me', checkAuth, getMe)

export default router