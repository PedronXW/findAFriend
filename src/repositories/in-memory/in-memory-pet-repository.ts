import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PetRepository, SearchQuery } from '../pet-repository'

export class InMemoryPetRepository implements PetRepository {
  private pets: Pet[] = []

  save(newPet: Pet) {
    this.pets.push(newPet)
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
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

  async findByCity(city: string): Promise<Pet[]> {
    const pets = this.pets.filter((pet) => pet.address.includes(city))

    return pets
  }

  async search(query: SearchQuery): Promise<Pet[]> {
    const pets = this.pets.filter((pet) => {
      if (query.age && pet.age !== query.age) return false
      if (query.size && pet.size !== query.size) return false
      if (query.energyLevel && pet.energyLevel !== query.energyLevel)
        return false
      if (
        query.independeceLevel &&
        pet.independenceLevel !== query.independeceLevel
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
