import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetService } from './create'

let petsRepository: InMemoryPetRepository
let usersRepository: InMemoryUserRepository
let sut: CreatePetService

describe('create a pet', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetRepository()
    usersRepository = new InMemoryUserRepository()
    sut = new CreatePetService(petsRepository)
  })
  it('should be able to create a pet', async () => {
    const user = await usersRepository.create({
      email: 'pedroalmeidan@gmail.com',
      name: 'Pedro Almeida',
      address: 'Rua 1',
      password: '123456',
      phone: '123456789',
      type: 'ORG',
    })

    const pet = await sut.execute({
      name: 'Dog',
      description: 'A dog',
      address: 'Rua 1',
      orgId: user.id,
      adoptationRequests: ['Arroz'],
    })

    console.log(pet)

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Dog')
    expect(pet.description).toEqual('A dog')
    expect(pet.address).toEqual('Rua 1')
    expect(pet.orgId).toEqual(user.id)
  })
})
