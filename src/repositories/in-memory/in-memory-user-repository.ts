import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'crypto'
import { UserRepository } from '../user-repository'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  async save(user: User): Promise<void> {
    this.users.push(user)
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.save(user)

    return user
  }
}
