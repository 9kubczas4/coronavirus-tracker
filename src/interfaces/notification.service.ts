export interface NotificationService {
  notify(report: string): Promise<void>;
}
