import { prisma } from '@/lib/prisma'
import { Pet, Prisma } from '@prisma/client'
import { PetRepository, SearchQuery } from '../pet-repository'

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = prisma.pet.create({
      data,
    })

    return pet
  }

  async findByCity(city: string): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        address: {
          contains: city,
        },
      },
    })
    return pets
  }

  async search(query: SearchQuery): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: query,
    })

    return pets
  }
}
