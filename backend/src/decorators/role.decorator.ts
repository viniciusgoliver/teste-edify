import { SetMetadata } from '@nestjs/common'

export const Role = (role: string): any => {
  return SetMetadata('role', role)
}
