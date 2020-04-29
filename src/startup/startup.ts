import chalk from 'chalk';
import { CoronavirusApiService } from '../interfaces/coronavirus-api.service';
import { NotificationService } from '../interfaces/notification.service';
import { ReportBuilder } from '../interfaces/report-builder';

export class Startup {
  constructor(private coronaApiService: CoronavirusApiService,
              private reportBuilder: ReportBuilder,
              private notificationService: NotificationService) {}

  public run(): Promise<void> {
    return this.coronaApiService.getLocations()
      .then((data) => {
        const report: string = this.reportBuilder.build(data);
        return this.notificationService.notify(report);
      })
      .then(() => {
        console.log(chalk.green('Process finished'));
      })
      .catch((error) => {
        console.log(chalk.red(`There has been an error ${JSON.stringify(error).slice(0, 1000)}`));
      });
  }
}
