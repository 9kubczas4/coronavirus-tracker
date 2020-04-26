import { Coordinates } from './coordinates';
import { LatestResult } from './latest-result';

export interface Location {
  id: number;
  country: string;
  country_code: string;
  country_population: number | null;
  province: string;
  last_updated: Date;
  coordinates: Coordinates;
  latest: LatestResult;
}
