import { CountryReportItem } from '../models/country-report-item';
import { CoronavirusStatus } from './../models/coronavirus-status';
import { ReportItem } from './../models/report-item';

export interface ReportService {
  getTopNCountriesWithHighestDeathFactor(n: number, data: CoronavirusStatus): ReportItem[];
  getTopNCountriesWithHighestConfirmationFactor(n: number, data: CoronavirusStatus): ReportItem[];
  getTopNCountriesWithHighestConirmationPerCapitaFactor(n: number, data: CoronavirusStatus): ReportItem[];
  getDataForCountriesInLatitude(min: number, max: number, data: CoronavirusStatus): CountryReportItem[];
  getDataForCountriesInLongitude(min: number, max: number, data: CoronavirusStatus): CountryReportItem[];
  getDataForSpecificCountries(countryCodes: string[], data: CoronavirusStatus): CountryReportItem[];
}
