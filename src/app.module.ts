import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrometheusModule, makeCounterProvider, makeGaugeProvider } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    PrometheusModule.register(),

  ],
  controllers: [AppController],
  providers: [
    AppService,
    makeGaugeProvider({
      name: "api_total_request",
      help: "Return total api requests",
      labelNames: ["method", "path"]
    })
  ],
})
export class AppModule { }
