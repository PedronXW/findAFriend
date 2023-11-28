import { AuthenticationDTO } from '@/dtos/user/AuthenticateDTO'
import { UserRepository } from '@/repositories/user-repository'
import { compare } from 'bcryptjs'

export class AuthenticationService {
  constructor(private usersRepository: UserRepository) {}

  async execute(data: AuthenticationDTO) {
    const user = await this.usersRepository.findByEmail(data.email)

    if (!user) {
      throw new Error('User not found')
    }

    const doesPasswordMatches = await compare(data.password, user.password)

    if (!doesPasswordMatches) {
      throw new Error('Incorrect password')
    }

    return { user }
  }
}
