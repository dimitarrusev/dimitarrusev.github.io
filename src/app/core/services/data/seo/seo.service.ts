import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable()
export class SeoService {
  readonly divider = '|';
  readonly brandName = 'Dimitar Rusev';

  constructor(
    private title: Title,
    private meta: Meta
  ) {}

  setTitle(title: string, invert?: boolean): SeoService {
    (invert)
      ? this.title.setTitle(`${ this.brandName } ${ this.divider } ${ title }`)
      : this.title.setTitle(`${ title } ${ this.divider } ${ this.brandName }`);

    return this;
  }

  setDescription(description: string): SeoService {
    this.meta.updateTag({
      name: 'description',
      content: description
    });

    return this;
  }
}
