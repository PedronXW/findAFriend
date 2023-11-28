import { CreateUserDTO } from '@/dtos/user/CreateUserDTO'
import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserRepository } from '../user-repository'

export class PrismaUserRepository implements UserRepository {
  async create(data: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        address: data.address,
        email: data.email,
        name: data.name,
        phone: data.phone,
        type: data.type,
        password: await hash(data.password, 6),
      },
    })
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    return user
  }
}
