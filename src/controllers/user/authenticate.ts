import { makeAuthenticateService } from '@/services/user/factories/makeAuthenticateService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { email, password } = registerBodySchema.parse(request.body)

  try {
    const authenticateService = makeAuthenticateService()
    const { user } = await authenticateService.execute({ email, password })
    const token = await reply.jwtSign(
      { role: user.type },
      { sign: { sub: user.id } },
    )

    const refreshToken = await reply.jwtSign(
      { role: user.type },
      { sign: { sub: user.id, expiresIn: '7d' } },
    )

    return reply
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ token })
  } catch (err) {
    throw new Error(err as string)
  }
}
