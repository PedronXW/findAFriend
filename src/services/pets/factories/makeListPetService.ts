import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { ListPetService } from '../list'

export function makeListService() {
  const petsRepository = new PrismaPetRepository()
  const listService = new ListPetService(petsRepository)
  return listService
}
