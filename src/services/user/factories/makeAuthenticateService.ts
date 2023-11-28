import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { AuthenticationService } from '../authentication'

export function makeAuthenticateService() {
  const userRepository = new PrismaUserRepository()
  const authenticateService = new AuthenticationService(userRepository)
  return authenticateService
}
