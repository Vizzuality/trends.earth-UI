import { GEFUIPage } from './app.po';

describe('gef-ui App', () => {
  let page: GEFUIPage;

  beforeEach(() => {
    page = new GEFUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
