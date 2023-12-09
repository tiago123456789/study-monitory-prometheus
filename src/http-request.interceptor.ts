import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Gauge, Histogram } from 'prom-client';
import { map, Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements NestInterceptor {
  constructor(
    @InjectMetric('api_total_request') public gauge: Gauge<string>,
    @InjectMetric('time_complete_request') public histogram: Histogram<string>,
  ) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const end = this.histogram
      .labels({
        method: request.method,
        path: request.path,
      })
      .startTimer();
    this.gauge
      .labels({
        method: request.method,
        path: request.path,
      })
      .inc();

    return handler.handle().pipe(
      map((data) => {
        end();
        return data;
      }),
    );
  }
}
