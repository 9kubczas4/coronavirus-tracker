import { CoronavirusStatus } from './../models/coronavirus-status';

export interface CoronavirusApiService {
  getLocations(): Promise<CoronavirusStatus>;
}
