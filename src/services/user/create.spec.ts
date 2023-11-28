import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUserService } from './create'

let usersRepository: InMemoryUserRepository
let sut: CreateUserService

describe('create', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new CreateUserService(usersRepository)
  })

  it('should be able to authenticate a user', async () => {
    const user = await sut.execute({
      email: 'pedroalmeidan@gmail.com',
      name: 'Pedro Almeida',
      address: 'Rua 1',
      password: '123456',
      phone: '123456789',
      type: 'USER',
    })

    expect(user.email).toBe('pedroalmeidan@gmail.com')
  })
})
