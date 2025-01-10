import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

@Controller({
  path: '/health'
})
export class HealthController {
  constructor (
    private health: HealthCheckService,
  ) {}

  @Get()
  @HealthCheck()
  checkHealth () {
    return this.health.check([]);
  }
}