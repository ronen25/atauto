import fs from 'fs/promises';

export default class Configuration {
  private _path = '';
  _config = {
    url: '',
  };

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

  get url(): string {
    return this._config['url'];
  }
}
