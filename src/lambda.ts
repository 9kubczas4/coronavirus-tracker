import sgMail from '@sendgrid/mail';
import { Callback, Context } from 'aws-lambda';
import { Notifications } from './enums/notifications';
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
import { Startup } from './startup/startup';

// tslint:disable-next-line:no-any
const handler = (event: any, context: Context, callback: Callback) => {
  if (process.env.notify === Notifications.Mail && process.env.apiKey) {
    sgMail.setApiKey(process.env.apiKey);
  }
  const config: Config = {
    countries: process.env.countries?.split(',') as string[],
    mailSettings: {
      apiKey: process.env.apiKey as string,
      from: process.env.from as string,
      to: process.env.to as string
    }
  };

  const coronaApiService: CoronavirusApiService = new CoronavirusTrackerApiService();
  const coronavirusReportService: ReportService = new CoronavirusReportService();
  const reportBuilder: ReportBuilder = new HtmlReportBuilder(coronavirusReportService, config.countries);
  const notificationService: NotificationService = process.env.notify === Notifications.Mail
    ? new EmailNotificationService(config)
    : new ConsoleNotificationService();

  const main = new Startup(coronaApiService, reportBuilder, notificationService);
  main.run()
    .then(() => {
      context.succeed(true);
    })
    .catch((err) => {
      context.fail(err);
    });
}

exports.handler = handler;