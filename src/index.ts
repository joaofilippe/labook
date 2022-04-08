import { Request, Response } from 'express'
import { server, app } from './app'
import { userRouter } from './routes/userRouter'
import { postRouter } from './routes/postRouter'
import UsersMigrations from './database/migrations/UsersMigrations'
import PostsMigrations from './database/migrations/PostsMigrations'

app.get('/migrations', async (req: Request, res: Response) => {
  const usersMigrations = new UsersMigrations()
  const postsMigrations = new PostsMigrations()

  await usersMigrations.create()
  await postsMigrations.create()

  res.status(201).send('Migrações realizadas com sucesso')
})

app.use('/users', userRouter)
app.use('/posts', postRouter)

server
