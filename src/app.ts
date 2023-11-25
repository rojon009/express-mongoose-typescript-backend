/** External Imports */
import express, {
  NextFunction,
  type Application,
  type Request,
  type Response,
} from 'express'
import cors from 'cors'

/** Internal Imports */
import router from './router/index'
import { errorResponse } from './utils/helper'

// app initialization
const app: Application = express()

/** Middleware */
app.use(cors())
app.use(express.json())

// Routes
app.use('/api', router)

// Homepage
app.get('/', (req: Request, res: Response) => {
  res.send(
    '<h3 style="margin-top: 50px; text-align: center">Hey Rojon is Here.</h3>',
  )
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorResponse(res, 500, err.message)
})

export default app
