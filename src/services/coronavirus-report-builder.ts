import { ReportBuilder } from '../interfaces/report-builder';
import { CoronavirusStatus } from '../models/coronavirus-status';

export class CoronavirusReportBuilder implements ReportBuilder {
  public build(data: CoronavirusStatus): string {
    throw new Error('Method not implemented.');
  }
}
