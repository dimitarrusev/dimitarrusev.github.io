import { AppPage } from './app.po';

describe('dimitarrusev.github.io App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('dimitarrusev.github.io');
  });
});
