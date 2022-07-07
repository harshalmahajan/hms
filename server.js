import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'
import cors from 'cors';
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

// hello
// db and authenticateUser
import connectDB from './db/dbConnection.js'

// routers
import authRouter from './routes/authRoutes.js'
import patientRouter from './routes/patientRoutes.js'
// import jobsRouter from './routes/jobsRoutes.js'

// middleware
import notFoundMiddleware from './middlewares/not-found.js'
import errorHandlerMiddleware from './middlewares/error-handler.js'
//import authenticateUser from './middlewares/auth.js'

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

// IMPLEMENT CORS....
app.use(cors());

// app.use(cors(
//   origin: 'https://www.natours.com'
// ));

app.options('*', cors());

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/patient', patientRouter)
// app.use('/api/v1/jobs', authenticateUser, jobsRouter)

// only when ready to deploy
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
// })

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
