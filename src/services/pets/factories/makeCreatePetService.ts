import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { CreatePetService } from '../create'

export function makeCreatePetService() {
  const petsRepository = new PrismaPetRepository()
  const createPetService = new CreatePetService(petsRepository)
  return createPetService
}
