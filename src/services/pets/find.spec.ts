import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FindPetService } from './find'

let petsRepository: InMemoryPetRepository
let usersRepository: InMemoryUserRepository
let sut: FindPetService

describe('find a pet', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetRepository()
    usersRepository = new InMemoryUserRepository()
    sut = new FindPetService(petsRepository)
  })
  it('should be able to find a pet', async () => {
    const user = await usersRepository.create({
      email: 'pedroalmeidan@gmail.com',
      name: 'Pedro Almeida',
      address: 'Rua 1',
      password: '123456',
      phone: '123456789',
      type: 'ORG',
    })

    const pet = await petsRepository.create({
      name: 'Dog',
      description: 'A dog',
      address: 'Rua 1',
      orgId: user.id,
      adoptationRequests: ['Arroz'],
    })

    const foundedPet = await sut.execute(pet.id)

    expect(foundedPet).toEqual(
      expect.objectContaining({
        id: pet.id,
      }),
    )
  })
})
