import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { rootRouter } from './routes/root.router.js'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger-output.json' with { type: 'json' }

const port = process.env.PORT || 3000
const app = express()

// Middleware
app.set('trust proxy', 1)
app.use(cors())  // Simple CORS - allow all
app.use(express.json())

// Swagger docs - pass file directly
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// API routes
app.use('/api', rootRouter)

// Start server
app.listen(port, () => console.log(`App running on port ${port}`))