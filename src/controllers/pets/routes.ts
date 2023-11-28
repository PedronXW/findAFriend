import { verifyJWT } from '@/middlewares/verify-jwt'
import { verifyUserRole } from '@/middlewares/verify-user-role'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findAPet } from './find'
import { listPets } from './list'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/pets', { onRequest: [verifyUserRole('ORG')] }, create)

  app.get('/pets/:id', findAPet)

  app.get('/pets', listPets)
}
