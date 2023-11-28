import { makeCreateUserService } from '@/services/user/factories/makeCreateUserService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string().min(3),
    phone: z.string().min(11),
    address: z.string().min(3),
    type: z.enum(['USER', 'ORG']),
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { name, phone, address, type, email, password } =
    createUserBodySchema.parse(request.body)

  try {
    const createUserService = makeCreateUserService()

    const user = await createUserService.execute({
      name,
      phone,
      address,
      type,
      email,
      password,
    })

    return reply.status(201).send({ user })
  } catch (err) {
    throw new Error(err as string)
  }
}
