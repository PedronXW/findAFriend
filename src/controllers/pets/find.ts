import { makeFindService } from '@/services/pets/factories/makeFindService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findAPet(request: FastifyRequest, reply: FastifyReply) {
  const findAPetParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = findAPetParamsSchema.parse(request.params)

  const findAPetService = makeFindService()

  const pet = await findAPetService.execute(id)

  return reply.status(200).send(pet)
}
