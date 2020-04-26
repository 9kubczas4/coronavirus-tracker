import request from 'request';
import { CoronavirusStatus } from '../models/coronavirus-status';
import { CoronavirusApiService } from './../interfaces/coronavirus-api.service';

export class CoronavirusTrackerApiService implements CoronavirusApiService {
  private static LOCATIONS_URL: string = 'https://coronavirus-tracker-api.herokuapp.com/v2/locations';

  public getLocations(): Promise<CoronavirusStatus> {
    return new Promise<CoronavirusStatus>((resolve, reject) => {
      request(CoronavirusTrackerApiService.LOCATIONS_URL, (err, response) => {
        console.log(err);
        console.log(response.body.slice(0.50));
        err
          ? reject(err)
          : resolve(JSON.parse(response.body));
      });
    });
  }
}
