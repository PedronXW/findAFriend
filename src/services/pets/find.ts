import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'

export class FindPetService {
  constructor(private petsRepository: PetRepository) {}

  async execute(id: string): Promise<Pet | null> {
    const pets = await this.petsRepository.findById(id)
    return pets
  }
}
