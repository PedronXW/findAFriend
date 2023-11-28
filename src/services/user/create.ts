import { CreateUserDTO } from '@/dtos/user/CreateUserDTO'
import { UserRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'

export class CreateUserService {
  constructor(private usersRepository: UserRepository) {}

  async execute(data: CreateUserDTO): Promise<User> {
    const user = await this.usersRepository.create(data)
    return user
  }
}
