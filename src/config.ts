import fs from 'fs/promises';

export default class Configuration {
  private _path = '';
  private _config = new Map<string, string>();

  async loadConfig(path: string): Promise<void> {
    const contents = await fs.readFile(path);
    const configObject = JSON.parse(contents.toString());

    // Store the object in the config map
    this._path = path;
    for (const [key, value] of Object.entries(configObject)) {
      this._config.set(key, value as string);
    }
  }

  get path(): string {
    return this._path;
  }

  get(propertyName: string): string {
    if (!this._config.has(propertyName)) {
      throw new Error(`Property '${propertyName} does not exist in config`);
    }

    return this._config.get(propertyName) ?? '';
  }
}
