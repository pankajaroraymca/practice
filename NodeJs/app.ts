import express from 'express'
import userRouter from './src/routes/user.routes'
import cors from 'cors'
import { authentication } from './src/middlewares/authentication/authentication'

const app = express()
app.use(cors()) // Third Party Middleware

app.use(express.json())
app.use(authentication) // Application level middleware
app.use('/users', userRouter)

export default app