import chalk from 'chalk';
import { CoronavirusApiService } from './interfaces/coronavirus-api.service';
import { NotificationService } from './interfaces/notification.service';
import { ReportBuilder } from './interfaces/report-builder';
import { ReportService } from './interfaces/report.service';
import { CoronavirusStatus } from './models/coronavirus-status';
import { ConsoleNotificationService } from './services/console-notification.service';
import { CoronavirusReportBuilder } from './services/plain-text-report-builder';
import { CoronavirusReportService } from './services/coronavirus-report.service';
import { CoronavirusTrackerApiService } from './services/coronavirus-tracker-api.service';

console.log(chalk.blue('start'));
const coronavirusApiService: CoronavirusApiService = new CoronavirusTrackerApiService();
const reportService: ReportService = new CoronavirusReportService();
const reportBuilder: ReportBuilder = new CoronavirusReportBuilder(reportService);
const notificationService: NotificationService = new ConsoleNotificationService();

coronavirusApiService.getLocations()
  .then((data: CoronavirusStatus) => {
    const report = reportBuilder.build(data);
    return notificationService.notify(report);
  })
  .then(() => {
    console.log(chalk.green('success'));
  })
  .catch((err) => {
    console.log(chalk.red(err));
  });
