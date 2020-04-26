import { ReportBuilder } from '../interfaces/report-builder';
import { CoronavirusStatus } from '../models/coronavirus-status';
import { ReportService } from './../interfaces/report.service';

export class CoronavirusReportBuilder implements ReportBuilder {
  constructor(private reportService: ReportService) {}

  public build(data: CoronavirusStatus): string {
    const section = this.reportService.getTopNCountriesWithHighestConirmationPerCapitaFactor(10, data);
    throw new Error('Method not implemented.');
  }
}
