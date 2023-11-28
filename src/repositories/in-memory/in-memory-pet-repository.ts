import { CreatePetDTO } from '@/dtos/pets/CreatePetDTO'
import { Pet } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PetRepository, SearchQuery } from '../pet-repository'

export class InMemoryPetRepository implements PetRepository {
  private pets: Pet[] = []

  save(newPet: Pet) {
    this.pets.push(newPet)
  }

  async create(data: CreatePetDTO): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      active: true,
      address: data.address,
      age: data.age || null,
      description: data.description,
      energyLevel: data.energyLevel || null,
      environmentType: data.environmentType || null,
      independenceLevel: data.independenceLevel || null,
      name: data.name,
      images: data.images || null,
      orgId: data.orgId,
      size: data.size || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.save(pet)

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pets = this.pets.filter((pet) => (pet.id = id))

    return pets[0]
  }

  async search(query: SearchQuery): Promise<Pet[]> {
    const pets = this.pets.filter((pet) => {
      if (query.age && pet.age !== query.age) return false
      if (query.size && pet.size !== query.size) return false
      if (query.energyLevel && pet.energyLevel !== query.energyLevel)
        return false
      if (
        query.independenceLevel &&
        pet.independenceLevel !== query.independenceLevel
      )
        return false
      if (
        query.environmentType &&
        pet.environmentType !== query.environmentType
      )
        return false

      return true
    })

    return pets
  }
}
