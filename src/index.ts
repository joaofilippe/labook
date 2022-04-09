import { server, app } from './app'
import { userRouter } from './routes/userRouter'
import { postRouter } from './routes/postRouter'
import { Request, Response } from 'express'
import UsersMigrations from './database/migrations/UsersMigrations'
import PostsMigrations from './database/migrations/PostsMigrations'

app.get('/migrations',async (req: Request, res: Response) => {
  try {
    const usersMigrations = new UsersMigrations()
    const postsMigrations = new PostsMigrations()

    await usersMigrations.create()
    await postsMigrations.create()

    res.send(200).send('Migrations criadas com sucesso')

  } catch (error : any) {
    res.status(500).send(error.message)
  }
})

app.use('/users', userRouter)
app.use('/posts', postRouter)

server
