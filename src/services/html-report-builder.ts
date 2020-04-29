import { ReportService } from '../interfaces/report.service';
import { CountryReportItem } from '../models/country-report-item';
import { ReportItem } from '../models/report-item';
import { ReportBuilderBase } from './base/report-builder-base';

export class HtmlReportBuilder extends ReportBuilderBase {
  constructor(reportService: ReportService, searchedCountries: string[]) {
    super(reportService, searchedCountries);
  }

  protected buildReportSection(title: string, data: ReportItem[] | CountryReportItem[]): string {
    return `${this.getSectionTitle(title)}${this.getSectionTable(data)}`;
  }

  protected buildPrefixSection(): string {
    return `<!DOCTYPE html>
    <html>
    <head>
    <style>
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }
    tr:nth-child(even) {
      background-color: #dddddd !important;
    }
    </style>
    </head>
    <body>`;
  }

  protected buildSuffixSection(): string {
    return `</body>
    </html>
    `;
  }

  private getSectionTitle(title: string): string {
    return `<h2>${title}</h2>`;
  }

  private getSectionTable(data: ReportItem[] | CountryReportItem[]): string {
    return this.isReportItem(data)
      ? `<table>`.concat(
        this.getReportItemSectionHeaders(),
        this.getReportItemTableSection(data as ReportItem[]),
        `</table>`)
      : `<table>`.concat(
        this.getCountryReportItemSectionHeaders(),
        this.getCountryReportItemTableSection(data as CountryReportItem[]),
        `</table>`
      );
  }

  private getReportItemSectionHeaders(): string {
    return `<tr>
      <th>Country</th>
      <th>Value</th>
    </tr>`;
  }

  private getReportItemTableSection(data: ReportItem[]): string {
    return data.reduce((prev, curr) => prev.concat(`<tr><td>${curr.country}</td><td>${curr.value}</td></tr>`), '');
  }

  private getCountryReportItemSectionHeaders(): string {
    return `<tr>
      <th>Country</th>
      <th>Confirmed</th>
      <th>Death</th>
    </tr>`;
  }

  private getCountryReportItemTableSection(data: CountryReportItem[]): string {
    return data.reduce((prev, curr) =>
      prev.concat(`<tr><td>${curr.country}</td><td>${curr.confirmed}</td><td>${curr.death}</td></tr>`), '');
  }
}
