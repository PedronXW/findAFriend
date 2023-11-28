import { CreatePetDTO } from '@/dtos/pets/CreatePetDTO'
import {
  Age,
  EnergyLevel,
  EnvironmentType,
  IndependenceLevel,
  Pet,
  Size,
} from '@prisma/client'

export type SearchQuery = {
  name: string | undefined
  description: string | undefined
  address: string | undefined
  age: Age | undefined
  size: Size | undefined
  energyLevel: EnergyLevel | undefined
  independenceLevel: IndependenceLevel | undefined
  environmentType: EnvironmentType | undefined
}

export interface PetRepository {
  create(data: CreatePetDTO): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  search(query: SearchQuery): Promise<Pet[]>
}
