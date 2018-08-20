var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['SelfJoinTests.js'],
  directConnect: true,

  multiCapabilities: [{
      browserName : 'chrome',
},{
  browserName : 'firefox',
  marionette : true,
  acceptInsecureCerts : true
}],

  onPrepare: function() {
    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: 'target/screenshots'
      })
    );
  }
};