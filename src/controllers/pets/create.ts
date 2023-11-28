import { makeCreatePetService } from '@/services/pets/factories/makeCreatePetService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    age: z.enum(['BABY', 'YOUNG', 'ADULT', 'SENIOR']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'XLARGE']).optional(),
    energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    environmentType: z.enum(['SMALL', 'LARGE', 'VERY_SMALL']).optional(),
    address: z.string().min(1).max(255),
    adoptationRequests: z.array(z.string()).optional(),
  })

  const {
    name,
    description,
    age,
    size,
    energyLevel,
    environmentType,
    independenceLevel,
    address,
    adoptationRequests,
  } = createPetBodySchema.parse(request.body)

  const createPetService = makeCreatePetService()

  const pet = await createPetService.execute({
    name,
    description,
    age,
    size,
    energyLevel,
    environmentType,
    independenceLevel,
    address,
    adoptationRequests,
    orgId: request.user.sub,
  })

  return reply.status(201).send(pet)
}
