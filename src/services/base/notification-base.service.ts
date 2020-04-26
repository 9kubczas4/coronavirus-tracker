import { NotificationService } from './../../interfaces/notification.service';

export abstract class NotificationBaseService implements NotificationService {
  public abstract notify(report: string): void;
}
