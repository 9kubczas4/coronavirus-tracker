import sgMail from '@sendgrid/mail';
import { Config } from '../models/config';
import { NotificationBaseService } from './base/notification-base.service';

export class EmailNotificationService extends NotificationBaseService {
  constructor(private config: Config) {
    super();
  }

  public notify(report: string): Promise<void> {
    const msg = {
      from: this.config.mailSettings.from,
      html: report,
      subject: `Coronavirus report - ${new Date().toUTCString()}`,
      to: this.config.mailSettings.to
    };
    return new Promise<void>((resolve, reject) => {
      sgMail.send(msg)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
  }
}
