import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { FindPetService } from '../find'

export function makeFindService() {
  const petsRepository = new PrismaPetRepository()
  const findService = new FindPetService(petsRepository)
  return findService
}
