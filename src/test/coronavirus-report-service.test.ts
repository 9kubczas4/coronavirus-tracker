import { assert } from 'chai';
import { FileHelper } from '../helpers/file.helper';
import { CoronavirusStatus } from '../models/coronavirus-status';
import { CoronavirusReportService } from '../services/coronavirus-report.service';

describe('CoronavirusReportService', () => {
  let coronavirusReportService: CoronavirusReportService;
  let data: CoronavirusStatus;

  beforeEach(() => {
    coronavirusReportService = new CoronavirusReportService();
    data = FileHelper.readJson<CoronavirusStatus>('./test-data/locations.json');
  });

  describe('getTopNCountriesWithHighestDeathFactor()', () => {
    it('when n = 0 then should return empty array', () => {
      const n = 0;

      const result = coronavirusReportService.getTopNCountriesWithHighestDeathFactor(n, data);

      assert.isArray(result);
      assert.isEmpty(result);
    });

    it('when n < 0 then should return empty array', () => {
      const n = -1;

      const result = coronavirusReportService.getTopNCountriesWithHighestDeathFactor(n, data);

      assert.isArray(result);
      assert.isEmpty(result);
    });

    it('when n > 0 then should return array with n results', () => {
      const n = 3;

      const result = coronavirusReportService.getTopNCountriesWithHighestDeathFactor(n, data);
      const algeriaResult = result.find((i) => i.country === 'Algeria');
      const argentinaResult = result.find((i) => i.country === 'Argentina');
      const australiaResult = result.find((i) => i.country === 'Australia');
      const albaniaResult = result.find((i) => i.country === 'Albania');

      assert.isArray(result);
      assert.isNotEmpty(result);
      assert.equal(result.length, n);
      assert.notEqual(algeriaResult, undefined);
      assert.notEqual(argentinaResult, undefined);
      assert.notEqual(australiaResult, undefined);
      assert.equal(albaniaResult, undefined);
      assert.equal(algeriaResult?.value, 415);
      assert.equal(argentinaResult?.value, 176);
      assert.equal(australiaResult?.value, 46);
    });
  });

  describe('getTopNCountriesWithHighestConfirmationFactor()', () => {
    it('when n = 0 then should return empty array', () => {
      const n = 0;

      const result = coronavirusReportService.getTopNCountriesWithHighestConfirmationFactor(n, data);

      assert.isArray(result);
      assert.isEmpty(result);
    });

    it('when n < 0 then should return empty array', () => {
      const n = -1;

      const result = coronavirusReportService.getTopNCountriesWithHighestConfirmationFactor(n, data);

      assert.isArray(result);
      assert.isEmpty(result);
    });

    it('when n > 0 then should return array with n results', () => {
      const n = 3;

      const result = coronavirusReportService.getTopNCountriesWithHighestConfirmationFactor(n, data);
      const algeriaResult = result.find((i) => i.country === 'Algeria');
      const argentinaResult = result.find((i) => i.country === 'Argentina');
      const australiaResult = result.find((i) => i.country === 'Australia');
      const albaniaResult = result.find((i) => i.country === 'Albania');

      assert.isArray(result);
      assert.isNotEmpty(result);
      assert.equal(result.length, n);
      assert.notEqual(algeriaResult, undefined);
      assert.notEqual(argentinaResult, undefined);
      assert.notEqual(australiaResult, undefined);
      assert.equal(albaniaResult, undefined);
      assert.equal(algeriaResult?.value, 3127);
      assert.equal(argentinaResult?.value, 3607);
      assert.equal(australiaResult?.value, 4579);
    });
  });

  describe('getTopNCountriesWithHighestConirmationPerCapitaFactor()', () => {
    it('when n = 0 then should return empty array', () => {
      const n = 0;

      const result = coronavirusReportService.getTopNCountriesWithHighestConirmationPerCapitaFactor(n, data);

      assert.isArray(result);
      assert.isEmpty(result);
    });

    it('when n < 0 then should return empty array', () => {
      const n = -1;

      const result = coronavirusReportService.getTopNCountriesWithHighestConirmationPerCapitaFactor(n, data);

      assert.isArray(result);
      assert.isEmpty(result);
    });

    it('when n > 0 then should return array with n results', () => {
      const n = 3;

      const result = coronavirusReportService.getTopNCountriesWithHighestConirmationPerCapitaFactor(n, data);
      const algeriaResult = result.find((i) => i.country === 'Algeria');
      const andorraResult = result.find((i) => i.country === 'Andorra');
      const armeniaResult = result.find((i) => i.country === 'Armenia');

      assert.isArray(result);
      assert.isNotEmpty(result);
      assert.equal(result.length, n);
      assert.equal(algeriaResult, undefined);
      assert.notEqual(andorraResult, undefined);
      assert.notEqual(armeniaResult, undefined);
      assert.equal(andorraResult?.value, 0.00949276679739241);
      assert.equal(armeniaResult?.value, 0.0005406914345804018);
    });
  });

  describe('getDataForCountriesInLatitude', () => {
    it('when no countries then should return empty array', () => {
      const minLatitude = 0;
      const maxLatitude = 5;

      const result = coronavirusReportService.getDataForCountriesInLatitude(minLatitude, maxLatitude, data);

      assert.isArray(result);
      assert.isEmpty(result);
    });

    it('when some countries are in provided boundaries then should return array with those countries', () => {
      const minLatitude = 40;
      const maxLatitude = 43;
      const expectedResultLength = 3;

      const result = coronavirusReportService.getDataForCountriesInLatitude(minLatitude, maxLatitude, data);

      const algeriaResult = result.find((i) => i.country === 'Algeria');
      const albaniaResult = result.find((i) => i.country === 'Albania');
      const andorraResult = result.find((i) => i.country === 'Andorra');
      const armeniaResult = result.find((i) => i.country === 'Armenia');

      assert.isArray(result);
      assert.isNotEmpty(result);
      assert.equal(result.length, expectedResultLength);
      assert.equal(algeriaResult, undefined);
      assert.notEqual(andorraResult, undefined);
      assert.notEqual(armeniaResult, undefined);
      assert.notEqual(albaniaResult, undefined);
    });
  });

  describe('getDataForCountriesInLongitude', () => {
    it('when no countries then should return empty array', () => {
      const minLongitude = 0;
      const maxLongitude = 1;

      const result = coronavirusReportService.getDataForCountriesInLongitude(minLongitude, maxLongitude, data);

      assert.isArray(result);
      assert.isEmpty(result);
    });

    it('when some countries are in provided boundaries then should return array with those countries', () => {
      const minLongitude = 0;
      const maxLongitude = 5;
      const expectedResultLength = 2;

      const result = coronavirusReportService.getDataForCountriesInLongitude(minLongitude, maxLongitude, data);

      const algeriaResult = result.find((i) => i.country === 'Algeria');
      const andorraResult = result.find((i) => i.country === 'Andorra');
      const armeniaResult = result.find((i) => i.country === 'Armenia');

      assert.isArray(result);
      assert.isNotEmpty(result);
      assert.equal(result.length, expectedResultLength);
      assert.notEqual(algeriaResult, undefined);
      assert.notEqual(andorraResult, undefined);
      assert.equal(armeniaResult, undefined);
    });
  });

  describe('getDataForSpecificCountries', () => {
    it('when no countries then should return empty array', () => {
      const result = coronavirusReportService.getDataForSpecificCountries(['pl'], data);

      assert.isArray(result);
      assert.isEmpty(result);
    });

    it('when some countries are in provided list then should return array with those countries', () => {
      const expectedResultLength = 3;

      const result = coronavirusReportService.getDataForSpecificCountries(['au', 'am', 'ar'], data);

      const algeriaResult = result.find((i) => i.country === 'Algeria');
      const argentinaResult = result.find((i) => i.country === 'Argentina');
      const armeniaResult = result.find((i) => i.country === 'Armenia');
      const australiaResult = result.find((i) => i.country === 'Australia');

      assert.isArray(result);
      assert.isNotEmpty(result);
      assert.equal(result.length, expectedResultLength);
      assert.notEqual(argentinaResult, undefined);
      assert.notEqual(armeniaResult, undefined);
      assert.notEqual(australiaResult, undefined);
      assert.equal(algeriaResult, undefined);
    });
  });
});
