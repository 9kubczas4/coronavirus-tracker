import { LatestResult } from './latest-result';
import { Location } from './location';

export interface CoronavirusStatus {
  latest: LatestResult;
  locations: Location[];
}
