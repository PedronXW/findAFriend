import {
  Age,
  EnergyLevel,
  EnvironmentType,
  IndependenceLevel,
  Pet,
  Prisma,
  Size,
} from '@prisma/client'

export type SearchQuery = {
  age: Age | undefined
  size: Size | undefined
  energyLevel: EnergyLevel | undefined
  independeceLevel: IndependenceLevel | undefined
  environmentType: EnvironmentType | undefined
}

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByCity(city: string): Promise<Pet[]>
  search(query: SearchQuery): Promise<Pet[]>
}
