import { CreateUserDTO } from '@/dtos/user/CreateUserDTO'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import { UserRepository } from '../user-repository'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  async save(user: User): Promise<void> {
    this.users.push(user)
  }

  async create(data: CreateUserDTO): Promise<User> {
    const user: User = {
      id: randomUUID(),
      address: data.address,
      email: data.email,
      name: data.name,
      phone: data.phone,
      type: data.type,
      password: await hash(data.password, 6),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.save(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null
  }
}
