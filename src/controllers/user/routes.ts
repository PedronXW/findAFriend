import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { create } from './create'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/auth', authenticate)

  app.post('/user', create)
}
