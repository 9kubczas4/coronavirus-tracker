import { ReportBuilder } from '../../interfaces/report-builder';
import { ReportService } from '../../interfaces/report.service';
import { CoronavirusStatus } from '../../models/coronavirus-status';
import { CountryReportItem } from '../../models/country-report-item';
import { ReportItem } from '../../models/report-item';

export abstract class ReportBuilderBase implements ReportBuilder {
  constructor(protected reportService: ReportService, protected searchedCountries: string[]) {}

  public build(data: CoronavirusStatus): string {
    const top10CountriesWithMostCases = this.reportService.getTopNCountriesWithHighestConfirmationFactor(10, data);
    const top5CountriesWithMostDeaths = this.reportService.getTopNCountriesWithHighestDeathFactor(5, data);
    const top20CountriesWithMostCasesPerCapita = this.reportService.getTopNCountriesWithHighestConirmationPerCapitaFactor(20, data);
    const searchedCountriesReport = this.reportService.getDataForSpecificCountries(this.searchedCountries, data);

    const initialReport = this.buildPrefixSection();
    const report = initialReport.concat(this.buildReportSection(`TOP 10 COUNTRIES - COVID-19 CONFIRMED CASES`, top10CountriesWithMostCases),
      this.buildReportSection(`TOP 5 COUNTRIES - COVID-19 DEATH CASES`, top5CountriesWithMostDeaths),
      this.buildReportSection(`TOP 20 COUNTRIES - COVID-19 CASES PER CAPITA`, top20CountriesWithMostCasesPerCapita),
      this.buildReportSection(`REQUIRED COUNTRIES - COVID-19 CASES`, searchedCountriesReport),
      this.buildSuffixSection());
    return report;
  }

  protected isReportItem(data: ReportItem[] | CountryReportItem[]): boolean {
    return data.length > 0 && 'value' in data[0];
  }

  protected abstract buildReportSection(title: string, data: ReportItem[] | CountryReportItem[]): string;

  protected abstract buildPrefixSection(): string;

  protected abstract buildSuffixSection(): string;
}
