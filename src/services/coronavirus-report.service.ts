import _ from 'lodash';
import { NumberHelper } from '../helpers/number.helper';
import { CoronavirusStatus } from '../models/coronavirus-status';
import { CountryReportItem } from '../models/country-report-item';
import { Location } from '../models/location';
import { ReportItem } from '../models/report-item';
import { ReportService } from './../interfaces/report.service';

export class CoronavirusReportService implements ReportService {
  public getTopNCountriesWithHighestDeathFactor(n: number, data: CoronavirusStatus): ReportItem[] {
    return this.getTopNCountriesWithHighestXFactor(n, data, (prev, curr) => prev + curr.latest.deaths);
  }

  public getTopNCountriesWithHighestConfirmationFactor(n: number, data: CoronavirusStatus): ReportItem[] {
    return this.getTopNCountriesWithHighestXFactor(n, data, (prev, curr) => prev + curr.latest.confirmed);
  }

  public getTopNCountriesWithHighestConirmationPerCapitaFactor(n: number, data: CoronavirusStatus): ReportItem[] {
    if (n <= 0) {
      return [];
    }
    const uniqueCountries = _.uniq(data.locations.map((l) => l.country));
    const groupedCountries = _.groupBy(data.locations, 'country');
    const countriesWithConfirmedCasesPerCapita = uniqueCountries.map((country) => {
      const population = groupedCountries[country][0].country_population;
      const countriesWithHighestConirmationPerCapita = population
        ? groupedCountries[country].reduce((prev, curr) => prev + curr.latest.confirmed, 0) /
          Number(groupedCountries[country][0].country_population)
        : 0;
      return {
        country,
        value: countriesWithHighestConirmationPerCapita
      };
    });
    return _.orderBy(countriesWithConfirmedCasesPerCapita, 'value', 'desc').slice(0, n);
  }

  public getDataForCountriesInLatitude(min: number, max: number, data: CoronavirusStatus): CountryReportItem[] {
    const locations = this.joinProvinces(data.locations)
      .filter((location) => NumberHelper.isBetween(Number(location.coordinates.latitude), min, max));
    return this.mapLocationsToCountryReportItem(locations);
  }

  public getDataForCountriesInLongitude(min: number, max: number, data: CoronavirusStatus): CountryReportItem[] {
    const locations = this.joinProvinces(data.locations).filter((location) =>
      NumberHelper.isBetween(Number(location.coordinates.longitude), min, max));
    return this.mapLocationsToCountryReportItem(locations);
  }

  public getDataForSpecificCountries(countryCodes: string[], data: CoronavirusStatus): CountryReportItem[] {
    const locations = this.joinProvinces(data.locations).filter((location) => countryCodes.map((code) => code.toLocaleLowerCase())
      .includes(location.country_code.toLocaleLowerCase()));
    return this.mapLocationsToCountryReportItem(locations);
  }

  private getTopNCountriesWithHighestXFactor(n: number, data: CoronavirusStatus,
                                             x: (previousValue: number, currentValue: Location) => number): ReportItem[] {
    if (n <= 0) {
      return [];
    }
    const uniqueCountryNames = _.uniq(data.locations.map((l) => l.country));
    const groupedCountries = _.groupBy(data.locations, 'country');
    const countriesWithDeathCases = uniqueCountryNames.map((countryName) => {
      return {
        country: countryName,
        value: groupedCountries[countryName].reduce((prev, curr) =>  x(prev, curr), 0)
      };
    });
    return _.orderBy(countriesWithDeathCases, 'value', 'desc').slice(0, n);
  }

  private joinProvinces(locations: Location[]): Location[] {
    const uniqueCountries = _.uniq(locations.map((l) => l.country));
    const groupedCountries = _.groupBy(locations, 'country');
    const mappedData: Location[] = uniqueCountries.map((country) => {
      const provinces = groupedCountries[country];
      return {
        coordinates: provinces[0].coordinates,
        country: provinces[0].country,
        country_code: provinces[0].country_code,
        country_population: provinces[0].country_population,
        id: provinces[0].id,
        last_updated: provinces[0].last_updated,
        latest: {
          confirmed: provinces.reduce((prev, curr) => prev + curr.latest.confirmed, 0),
          deaths: provinces.reduce((prev, curr) => prev + curr.latest.deaths, 0),
          recovered: provinces.reduce((prev, curr) => prev + curr.latest.recovered, 0)
        },
        province: provinces.map((p) => p.province).join(',')
      };
    });
    return mappedData;
  }

  private mapLocationsToCountryReportItem(locations: Location[]): CountryReportItem[] {
    return locations.map((location) => {
      return {
        confirmed: location.latest.confirmed,
        country: location.country,
        death: location.latest.deaths,
        recovered: location.latest.recovered
      };
    });
  }
}
