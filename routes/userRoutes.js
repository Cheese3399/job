import express from 'express'
import userAuth from '../middlewares/authmiddleware.js'
import { updateUserController } from '../controllers/userController.js'


// router objcet
const router = express.Router()

// routes
// GET USERS || GET

// UPDATE USER || POT
router.put('/update-user', userAuth, updateUserController)

export default router