import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { LogExecution } from './decorators/log-execution.decorator'

@ApiTags('API: Initial')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({
    status: 200,
    description: 'API is running'
  })
  @Get('/health')
  @LogExecution()
  getHealthCheck(): string {
    return this.appService.getHealthCheck()
  }
}
