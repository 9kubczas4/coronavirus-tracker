import { ReportService } from '../interfaces/report.service';
import { CountryReportItem } from '../models/country-report-item';
import { ReportItem } from '../models/report-item';
import { ReportBuilderBase } from './base/report-builder-base';

export class PlainTextReportBuilder extends ReportBuilderBase {
  constructor(reportService: ReportService, searchedCountries: string[]) {
    super(reportService, searchedCountries);
  }

  protected buildReportSection(title: string, data: ReportItem[] | CountryReportItem[]): string {
    return `${title}\n${this.getBreakLine()}${this.getColumnsNames(data)}${this.getStringifyData(data)}\n${this.getBreakLine()}`;
  }

  protected buildPrefixSection(): string {
    return '';
  }

  protected buildSuffixSection(): string {
    return '';
  }

  private getStringifyData(data: ReportItem[] | CountryReportItem[]): string {
    return this.isReportItem(data)
      ? (data as ReportItem[]).map((i) => `${i.country}\t\t\t\t\t${i.value.toFixed(5)}`).join('\n')
      : (data as CountryReportItem[]).map((i) => `${i.country}\t\t\t\t\t${i.confirmed}\t\t\t\t\t${i.death}`).join('\n');
  }

  private getColumnsNames(data: ReportItem[] | CountryReportItem[]): string {
    return this.isReportItem(data)
      ? `Country\t\t\t\t\tValue\n`
      : `Country\t\t\t\t\tConfirmed\t\t\t\t\tDeath\n`;
  }

  private getBreakLine(): string {
    return `-------------------------------------------------------------------------------\n`;
  }
}
