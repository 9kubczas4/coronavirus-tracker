import chalk from 'chalk';
import { NotificationBaseService } from './base/notification-base.service';

export class ConsoleNotificationService extends NotificationBaseService {
  public notify(report: string): Promise<void> {
    console.log(chalk.magenta(report));
    return Promise.resolve();
  }
}
