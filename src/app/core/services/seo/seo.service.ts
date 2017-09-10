import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable()
export class SeoService {
  readonly siteTitle = 'Dimitar Rusev';

  constructor(
    private title: Title,
    private meta: Meta
  ) {}

  setTitle(title: string): SeoService {
    this.title.setTitle(`${ title } - ${ this.siteTitle }`);

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
