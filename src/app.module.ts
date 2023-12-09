import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  PrometheusModule,
  makeCounterProvider,
  makeGaugeProvider,
  makeHistogramProvider,
} from '@willsoto/nestjs-prometheus';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskScheduler } from './app.schedule';

@Module({
  imports: [PrometheusModule.register(), ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    TaskScheduler,
    makeGaugeProvider({
      name: 'api_total_request',
      help: 'Return total api requests',
      labelNames: ['method', 'path'],
    }),
    makeCounterProvider({
      name: 'total_background_jobs_execution',
      help: 'Metric to track background jobs',
      labelNames: ['name'],
    }),
    makeHistogramProvider({
      name: 'background_jobs_time_execution',
      help: 'The time to complete background jobs',
      labelNames: ['name'],
    }),
    makeHistogramProvider({
      name: 'time_complete_request',
      help: 'Time spended to complete api requests',
      labelNames: ['method', 'path'],
    }),
  ],
})
export class AppModule {}
