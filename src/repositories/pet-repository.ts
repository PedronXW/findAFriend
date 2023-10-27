import { Pet, Prisma } from '@prisma/client'

export type SearchQuery = {
  age: string | null
  size: string | null
  energyLevel: string | null
  independeceLevel: string | null
  environmentType: string | null
}

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByCity(city: string): Promise<Pet[]>
  search(query: SearchQuery): Promise<Pet[]>
}
