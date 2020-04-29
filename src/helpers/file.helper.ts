import fs from 'fs';

export class FileHelper {
  public static readJson<T>(filePath: string): T {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data.toString());
  }
}