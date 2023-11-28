import { UserType } from '@prisma/client'

export interface CreateUserDTO {
  name: string
  email: string
  password: string
  phone: string
  address: string
  type: UserType
}
