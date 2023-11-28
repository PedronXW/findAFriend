import { CreatePetDTO } from '@/dtos/pets/CreatePetDTO'
import { prisma } from '@/lib/prisma'
import { Pet } from '@prisma/client'
import { PetRepository, SearchQuery } from '../pet-repository'

export class PrismaPetRepository implements PetRepository {
  async create(data: CreatePetDTO): Promise<Pet> {
    const pet = await prisma.pet.create({
      data: {
        name: data.name,
        description: data.description,
        age: data.age,
        size: data.size,
        energyLevel: data.energyLevel,
        independenceLevel: data.independenceLevel,
        environmentType: data.environmentType,
        address: data.address,
        orgId: data.orgId,
        active: data.active,
        images: {
          createMany: {
            data: data.images
              ? data.images.map((image) => ({ url: image }))
              : [],
          },
        },
        adoptationRequests: {
          createMany: {
            data: data.adoptationRequests
              ? data.adoptationRequests.map((request) => ({ request }))
              : [],
          },
        },
      },
    })

    return pet
  }

  async findById(id: string): Promise<Pet> {
    const pets = await prisma.pet.findFirst({
      where: {
        id,
      },
    })
    return pets
  }

  async search(query: SearchQuery): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        address: {
          contains: query.address,
        },
        name: {
          contains: query.name,
        },
        description: {
          contains: query.description,
        },
        age: query.age,
        size: query.size,
        energyLevel: query.energyLevel,
        environmentType: query.environmentType,
        independenceLevel: query.independenceLevel,
      },
    })

    return pets
  }
}
