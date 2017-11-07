import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

type Divider = '·' | '-' | '|';
type Settings = {
  displayBrandName: boolean;
  invertTitleAndBrandNameOrder?: boolean;
};

@Injectable()
export class SeoService {
  private _divider: Divider;
  private _brandName: string;
  private _settings: Settings;

  constructor(
    private title: Title,
    private meta: Meta
  ) {
    this.setDefaults();
  }

  set divider(divider: Divider) {
    this._divider = divider;
  }

  get divider(): Divider {
    return this._divider;
  }

  set brandName(brandName: string) {
    this._brandName = brandName;
  }

  get brandName(): string {
    return this._brandName;
  }

  set settings(settings: Settings) {
    this._settings = Object.assign({}, this._settings, settings);
  }

  get settings(): Settings {
    return this._settings;
  }

  setDefaults() {
    this.divider = '-';
    this.brandName = 'Dimitar Rusev';
    this.settings = {
      displayBrandName: true,
      invertTitleAndBrandNameOrder: false
    };
  }

  setTitle(title: string) {
    (this.settings.displayBrandName)
      ? (this.settings.invertTitleAndBrandNameOrder)
          ? this.title.setTitle(`${ this.brandName } ${ this.divider } ${ title }`)
          : this.title.setTitle(`${ title } ${ this.divider } ${ this.brandName }`)
      : this.title.setTitle(`${ title }`);
  }

  setDescription(description: string) {
    this.meta.updateTag({
      name: 'description',
      content: description
    });
  }
}
