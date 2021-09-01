import fs from 'fs/promises';

export default class Configuration {
  private _path = '';
  private _config = new Map<string, string>();

  async loadConfig(path: string): Promise<void> {
    const contents = await fs.readFile(path);
    const configObject = JSON.parse(contents.toString());

    // Store the object in the config map
    this._path = path;
    this._config = configObject;
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
