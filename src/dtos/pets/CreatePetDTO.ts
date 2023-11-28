import {
  Age,
  EnergyLevel,
  EnvironmentType,
  IndependenceLevel,
  Size,
} from '@prisma/client'

export interface CreatePetDTO {
  name: string
  description: string
  age?: Age | null
  size?: Size | null
  energyLevel?: EnergyLevel | null
  independenceLevel?: IndependenceLevel | null
  environmentType?: EnvironmentType | null
  address: string
  orgId: string
  active?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  images?: string[]
  adoptationRequests?: string[]
}
