import express from 'express'
import { createUser } from '../controllers/user.controller'

const userRouter  = express.Router()

userRouter.get('/', createUser)
// userRouter.post('')

export default userRouter