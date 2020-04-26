import { NotificationBaseService } from './base/notification-base.service';

export class EmailNotificationService extends NotificationBaseService {
  public notify(report: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
