describe('Search Functions', function() {
    
    beforeEach(function() {
        browser.get('https://dev.thewinesociety.com/');
    });
    
    it('Clicking search should take you to search page"', function() {
        browser.
    element(by.id('btnSearchDesktop')).click();
    expect(browser.getTitle()).toEqual('Bordeaux - By Region - Buy Wine - The Wine Society')
    });
  });