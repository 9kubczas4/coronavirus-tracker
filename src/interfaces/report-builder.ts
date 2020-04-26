import { CoronavirusStatus } from './../models/coronavirus-status';

export interface ReportBuilder {
  build(data: CoronavirusStatus): string;
}
