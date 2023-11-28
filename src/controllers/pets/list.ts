import { makeListService } from '@/services/pets/factories/makeListPetService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function listPets(request: FastifyRequest, reply: FastifyReply) {
  const listPetsBodySchema = z.object({
    name: z.string().min(1).max(255).optional(),
    description: z.string().min(1).max(255).optional(),
    age: z.enum(['BABY', 'YOUNG', 'ADULT', 'SENIOR']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'XLARGE']).optional(),
    energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    environmentType: z.enum(['SMALL', 'LARGE', 'VERY_SMALL']).optional(),
    address: z.string().min(1).max(255),
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
  } = listPetsBodySchema.parse(request.query)

  const listPetsService = makeListService()

  const pets = await listPetsService.execute({
    name,
    description,
    age,
    size,
    energyLevel,
    environmentType,
    independenceLevel,
    address,
  })

  return reply.status(200).send(pets)
}
