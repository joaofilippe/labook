import {server , app} from './app'
import { userRouter } from './routes/userRouter';

app.use("/users", userRouter)

server