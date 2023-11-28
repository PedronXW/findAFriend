import { PetRepository, SearchQuery } from '@/repositories/pet-repository'

export class ListPetService {
  constructor(private petsRepository: PetRepository) {}

  async execute(data: SearchQuery) {
    const pets = await this.petsRepository.search(data)

    return pets
  }
}
