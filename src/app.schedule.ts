import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram } from 'prom-client';

@Injectable()
export class TaskScheduler {
  constructor(
    @InjectMetric('total_background_jobs_execution')
    public metric: Counter<string>,
    @InjectMetric('background_jobs_time_execution')
    public metricHistogram: Histogram<string>,
  ) {}

  private sleep(timeInSeconds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, timeInSeconds * 1000);
    });
  }

  private generateRangom(low, up) {
    const u = Math.max(low, up);
    const l = Math.min(low, up);
    const diff = u - l;
    const r = Math.floor(Math.random() * (diff + 1)); //'+1' because Math.random() returns 0..0.99, it does not include 'diff' value, so we do +1, so 'diff + 1' won't be included, but just 'diff' value will be.

    return l + r; //add the random number that was selected within distance between low and up to the lower limit.
  }

  @Cron('*/5 * * * * *')
  async handleCron() {
    this.metric.labels({ name: 'job_execute_each_5_seconds' }).inc();
    const end = this.metricHistogram
      .labels({
        name: 'job_execute_each_5_seconds',
      })
      .startTimer();
    const timeToWait = this.generateRangom(1, 10);
    await this.sleep(timeToWait);
    console.log('Execute test each 5 seconds');
    end();
  }

  @Cron('*/10 * * * * *')
  async handleCron10() {
    this.metric.labels({ name: 'job_execute_each_10_seconds' }).inc();
    const end = this.metricHistogram
      .labels({
        name: 'job_execute_each_10_seconds',
      })
      .startTimer();
    const timeToWait = this.generateRangom(1, 10);
    await this.sleep(timeToWait);
    console.log('Execute test each 10 seconds');
    end();
  }
}
