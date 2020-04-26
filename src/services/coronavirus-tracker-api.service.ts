import { CoronavirusStatus } from '../models/coronavirus-status';
import { CoronavirusApiService } from './../interfaces/coronavirus-api.service';

export class CoronavirusTrackerApiService implements CoronavirusApiService {
  public getLocations(): CoronavirusStatus {
    throw new Error('Method not implemented.');
  }
}
