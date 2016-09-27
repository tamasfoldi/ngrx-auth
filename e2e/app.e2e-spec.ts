import { NgrxAuthPage } from './app.po';

describe('ngrx-auth App', function() {
  let page: NgrxAuthPage;

  beforeEach(() => {
    page = new NgrxAuthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
