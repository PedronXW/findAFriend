import { CreatePetDTO } from '@/dtos/pets/CreatePetDTO'
import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'

export class CreatePetService {
  constructor(private petsRepository: PetRepository) {}

  async execute(data: CreatePetDTO): Promise<Pet> {
    const pet = await this.petsRepository.create({
      address: data.address,
      age: data.age || null,
      description: data.description,
      energyLevel: data.energyLevel || null,
      environmentType: data.environmentType || null,
      independenceLevel: data.independenceLevel || null,
      name: data.name,
      images: data.images || [],
      orgId: data.orgId,
      size: data.size || null,
      adoptationRequests: data.adoptationRequests || [],
      active: true,
    })
    return pet
  }
}
