/** External Imports */
import express, {
  NextFunction,
  type Application,
  type Request,
  type Response,
} from 'express'
import cors from 'cors'
import compression from 'compression'

/** Internal Imports */
import router from './router/index'
import { errorResponse } from './utils/helper'

// app initialization
const app: Application = express()

/** Middleware */
app.use(cors())
app.use(compression())
app.use(express.json())

// Routes
app.use('/api', router)

// Homepage
app.get('/', (req: Request, res: Response) => {
  res.send(
    '<h3 style="margin-top: 50px; text-align: center">Goto <br/> <a href="/api-docs">API DOCS</a><br/>for API documentation</h3>',
  )
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorResponse(res, 500, err.message)
})

export default app
