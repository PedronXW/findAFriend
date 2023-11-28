import { CreateUserDTO } from '@/dtos/user/CreateUserDTO'
import { User } from '@prisma/client'

export interface UserRepository {
  create(data: CreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | null>
}
