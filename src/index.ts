import sgMail from '@sendgrid/mail';
import chalk from 'chalk';
import program from 'commander';
import { Notifications } from './enums/notifications';
import { FileHelper } from './helpers/file.helper';
import { CoronavirusApiService } from './interfaces/coronavirus-api.service';
import { NotificationService } from './interfaces/notification.service';
import { ReportBuilder } from './interfaces/report-builder';
import { ReportService } from './interfaces/report.service';
import { Config } from './models/config';
import { ConsoleNotificationService } from './services/console-notification.service';
import { CoronavirusReportService } from './services/coronavirus-report.service';
import { CoronavirusTrackerApiService } from './services/coronavirus-tracker-api.service';
import { EmailNotificationService } from './services/email-notification.service';
import { HtmlReportBuilder } from './services/html-report-builder';
import { PlainTextReportBuilder } from './services/plain-text-report-builder';

program
  .option('-n, --notify <type>', 'console or mail', Notifications.Console)
  .option('-l, --list <items>', 'countries list', (value: string) => value.split(','));
program.parse(process.argv);

const config = FileHelper.readJson<Config>('./config/config.json');
if (program.notify === Notifications.Mail && config.mailSettings.apiKey) {
  sgMail.setApiKey(config.mailSettings.apiKey);
}

const countries = program.list ? program.list : config.countries;
const coronaApiService: CoronavirusApiService = new CoronavirusTrackerApiService();
const coronavirusReportService: ReportService = new CoronavirusReportService();
const reportBuilder: ReportBuilder = program.notify === Notifications.Mail
  ? new HtmlReportBuilder(coronavirusReportService, countries)
  : new PlainTextReportBuilder(coronavirusReportService, countries);
const notificationService: NotificationService = program.notify === Notifications.Mail
  ? new EmailNotificationService(config)
  : new ConsoleNotificationService();

coronaApiService.getLocations()
  .then((data) => {
    const report: string = reportBuilder.build(data);
    return notificationService.notify(report);
  })
  .then(() => {
    console.log(chalk.green('Process finished'));
  })
  .catch((error) => {
    console.log(chalk.red(`There has been an error ${JSON.stringify(error).slice(0, 1000)}`));
  });
