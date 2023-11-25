import { Injectable } from '@nestjs/common';
import * as fibonacci from 'fibonacci';

@Injectable()
export class AppService {
  getHello(): number {
    return fibonacci.iterate(3000);
  }
}
