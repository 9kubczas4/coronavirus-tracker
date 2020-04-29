export interface Config {
  countries: string[];
  mailSettings: {
    from: string;
    to: string;
    apiKey: string;
  };
};
