import 'dotenv/config'
import express from 'express'
import cors from 'cors'  // ← ADD THIS
import { rootRouter } from './routes/root.router.js'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger-output.json' with { type: 'json' }

const port = process.env.PORT || 3000

const app = express()

app.set('trust proxy', 1)
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] // Make it an array
    : '*'
}))

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/api', rootRouter)

app.listen(port, () => console.log(`App running on port ${port}`))