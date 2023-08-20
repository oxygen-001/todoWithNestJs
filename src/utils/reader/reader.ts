import * as fs from 'fs';
import { getFromJson } from './typesOfReader';
import * as path from 'path';

export class Reader {
  dir: string;

  constructor(dir: string) {
    this.dir = dir;
  }

  async read(): Promise<getFromJson[]> {
    const data: string = await fs.promises.readFile(
      path.join(process.cwd(), this.dir),
      'utf-8',
    );

    return data ? JSON.parse(data) : [];
  }

  async write(data): Promise<void> {
    await fs.promises.writeFile(
      path.join(process.cwd(), this.dir),
      JSON.stringify(data, null, 2),
    );
  }
}
