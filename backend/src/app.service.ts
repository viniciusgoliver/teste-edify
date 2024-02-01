import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHealthCheck(): string {
    const result = {
      msg: 'API is running',
      timestamp: new Date().toISOString(),
      status: 200
    }

    return JSON.stringify(result)
  }
}
