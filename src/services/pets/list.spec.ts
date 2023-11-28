import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ListPetService } from './list'

let petsRepository: InMemoryPetRepository
let usersRepository: InMemoryUserRepository
let sut: ListPetService

describe('list pets', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetRepository()
    usersRepository = new InMemoryUserRepository()
    sut = new ListPetService(petsRepository)
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
      age: 'ADULT',
      energyLevel: 'HIGH',
      environmentType: 'LARGE',
      independenceLevel: 'LOW',
      size: 'SMALL',
    })

    const foundedPets = await sut.execute({
      age: 'ADULT',
      energyLevel: 'HIGH',
      environmentType: 'LARGE',
      independeceLevel: 'LOW',
      size: 'SMALL',
    })

    expect(foundedPets.length).toEqual(1)
    expect(foundedPets[0].id).toEqual(pet.id)
  })

  it('should be able to not find a pet', async () => {
    const user = await usersRepository.create({
      email: 'pedroalmeidan@gmail.com',
      name: 'Pedro Almeida',
      address: 'Rua 1',
      password: '123456',
      phone: '123456789',
      type: 'ORG',
    })

    await petsRepository.create({
      name: 'Dog',
      description: 'A dog',
      address: 'Rua 1',
      orgId: user.id,
      adoptationRequests: ['Arroz'],
      age: 'ADULT',
      energyLevel: 'HIGH',
    })

    const foundedPets = await sut.execute({
      age: 'ADULT',
      energyLevel: 'HIGH',
      environmentType: 'LARGE',
      independeceLevel: 'LOW',
      size: 'SMALL',
    })

    expect(foundedPets.length).toEqual(0)
  })
})
