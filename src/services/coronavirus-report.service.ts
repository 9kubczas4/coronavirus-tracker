import { CoronavirusStatus } from '../models/coronavirus-status';
import { CountryReportItem } from '../models/country-report-item';
import { ReportItem } from '../models/report-item';
import { ReportService } from './../interfaces/report.service';

export class CoronavirusReportService implements ReportService {
  public getTopNCountriesWithHighestDeathFactor(n: number, data: CoronavirusStatus): ReportItem[] {
    throw new Error('Method not implemented.');
  }
  public getTopNCountriesWithHighestConfirmationFactor(n: number, data: CoronavirusStatus): ReportItem[] {
    throw new Error('Method not implemented.');
  }
  public getTopNCountriesWithHighestConirmationPerCapitaFactor(n: number, data: CoronavirusStatus): ReportItem[] {
    throw new Error('Method not implemented.');
  }
  public getDataForCountriesInLatitude(min: number, max: number, data: CoronavirusStatus): CountryReportItem[] {
    throw new Error('Method not implemented.');
  }
  public getDataForCountriesInLongitude(min: number, max: number, data: CoronavirusStatus): CountryReportItem[] {
    throw new Error('Method not implemented.');
  }
  public getDataForSpecificCountries(countryCodes: string[], data: CoronavirusStatus): CountryReportItem[] {
    throw new Error('Method not implemented.');
  }
}
