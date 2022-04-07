import { Request, Response } from 'express'
import { server, app } from './app'
import { userRouter } from './routes/userRouter'
import { postRouter } from './routes/postRouter'


app.use('/users', userRouter)
app.use('/posts', postRouter)

server
