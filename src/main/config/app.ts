import setupMiddlewares from '../config/middlewares'
import setupRoutes from '../config/routes'
import express from 'express'

const app = express()
setupMiddlewares(app)
setupRoutes(app)
export default app
