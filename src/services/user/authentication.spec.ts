import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticationService } from './authentication'

let usersRepository: InMemoryUserRepository
let sut: AuthenticationService

describe('authentication', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new AuthenticationService(usersRepository)
  })

  it('should be able to authenticate a user', async () => {
    await usersRepository.create({
      email: 'pedroalmeidan@gmail.com',
      name: 'Pedro Almeida',
      address: 'Rua 1',
      password: '123456',
      phone: '123456789',
      type: 'USER',
    })

    const { user } = await sut.execute({
      email: 'pedroalmeidan@gmail.com',
      password: '123456',
    })

    expect(user.email).toBe('pedroalmeidan@gmail.com')
  })
})
