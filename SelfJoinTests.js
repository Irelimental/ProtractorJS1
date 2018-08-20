var DetailsPage = function() { 
  this.titleDrop = element(by.id('lbTitle'));
  this.titleOptions = this.titleDrop.all(by.css('option'));
  this.firstName = element(by.id('tbFirstName'));
  this.surname = element(by.id('tbLastName'));
  this.email = element(by.id('tbEmail'));
  this.phone = element(by.id('tbTelephone'));
  this.day = element(by.id('DD'));
  this.month = element(by.id('MM'));
  this.year = element(by.id('YYYY'));
  this.postcode = element(by.id('tbLookupPostcode'));
  this.findAddressButton = element(by.id('btnFindAddress'));
  this.addressList = element(by.id("lbAddressList"));
  this.addressLine1 = element(by.id('tbAddressLine1'));
  this.addressLine2 = element(by.id('tbAddressLine2'));
  this.addressLine3 = element(by.id('tbAddressLine3'));
  this.addressTown = element(by.id('tbAddressTown'));
  this.addressCounty = element(by.id('tbAddressCounty'));
  this.addressPostcode = element(by.id('tbAddressPostcode'));
  this.clearAddressButton = element(by.id('btn-reset-address'));
  this.userAddressLookupButton = element(by.id('btn-toggle-lookup'));
  this.confirmLabel = element(by.css('[for="cbConfirmRules"]'));
  this.nextButton = element(by.id('btnSelfStep1'));

  this.topMargin = element(by.css('[class="no-top-margin"]'));
  this.error_message = element(by.css('[class="state-msg-error"]'));
  this.info_message = element.all(by.css('[class="state-msg-info"]'));
  this.error_messages = element.all(by.css('[class="state-msg-error"]'));
}

function clearDOB(DetailsPage)
{
  DetailsPage.day.clear();
  DetailsPage.month.clear();
  DetailsPage.year.clear();
}

var PaymentPage = function() { 
  this.cardHoldersName = element(by.id('tbCardHolderName'));
  this.cardNumber = element(by.id('tbCardNumber'));
  this.expiryMonth = element(by.id('lbCardExpiryMonth'));
  this.expiryYear = element(by.id('lbCardExpiryYear'));
  this.securityCode = element(by.id('tbCardCCV'));
  this.applyingOnMyOwn = element(by.css('[for="noProposer"]'));
  this.proposerSelect = element(by.css('[for="proposer"]'));
  this.proposerFullName = element(by.id('tbProposerFullName'));
  this.proposerStreetName = element(by.id('tbProposerStreetName'));
  this.proposerPostcode = element(by.id('tbProposerPostcode'));
  this.proposerEmail = element(by.id('tbProposerEmail'));
  this.hearAboutUsDrop = element(by.id('lbSource'));
  this.completeApplication = element(by.id('btnSelfStep2'));

  this.topMargin = element(by.css('[class="no-top-margin"]'));
  this.error_message = element(by.css('[class="state-msg-error"]'));
  this.info_message = element.all(by.css('[class="state-msg-info"]'));
}

function elementIsDisplayed(element)
{
  expect(element.isDisplayed()).toBe(true);
}

function clickElement(element)
{
  browser.executeScript("arguments[0].scrollIntoView(true)",element.getWebElement());
  element.click();
}
var getValue = function(element)
{
  return element.getAttribute('value');
}

describe('Self Join Tests', function() {
    browser.get('https://dev.thewinesociety.com/applicationform2/self');
    browser.driver.manage().window().maximize();
    browser.waitForAngular();
    var detailsPage = new DetailsPage();
    var paymentPage = new PaymentPage();
    var dt = new Date();
    // Is the technical issues part
    element(by.id('btn--alert-msg-close')).click();

  it('Check Title Validation', function() {
    expect(detailsPage.titleOptions.count()).toEqual(8);
    clickElement(detailsPage.titleDrop);
    clickElement(detailsPage.topMargin);
    expect(detailsPage.error_message.isPresent()).toBe(true);
    expect(detailsPage.error_message.getText()).toEqual('Required Field');
    clickElement(detailsPage.titleDrop);
    element(by.css('[value="Mr"]')).click();
    expect(getValue(detailsPage.titleDrop)).toEqual('Mr');
    element(by.css('[value="Mrs"]')).click();
    expect(getValue(detailsPage.titleDrop)).toEqual('Mrs');
    element(by.css('[value="Miss"]')).click();
    expect(getValue(detailsPage.titleDrop)).toEqual('Miss');
    element(by.css('[value="Dr"]')).click();
    expect(getValue(detailsPage.titleDrop)).toEqual('Dr');
    element(by.css('[value="Sir"]')).click();
    expect(getValue(detailsPage.titleDrop)).toEqual('Sir');
    element(by.css('[value="Prof"]')).click();
    expect(getValue(detailsPage.titleDrop)).toEqual('Prof');
  });   
    
  it('Check First Name Validation', function() {
  expect(getValue(detailsPage.firstName)).toEqual('');  
  detailsPage.firstName.click();
  detailsPage.topMargin.click();
  expect(detailsPage.error_message.isPresent()).toBe(true);
  expect(detailsPage.error_message.getText()).toEqual('Required Field');

  detailsPage.firstName.sendKeys('A');
  detailsPage.topMargin.click();

  expect(detailsPage.error_message.isPresent()).toBe(true);
  expect(detailsPage.error_message.getText()).toEqual('Must be at least 2 characters long.');
  detailsPage.firstName.clear();

  // 21 Characters
  detailsPage.firstName.sendKeys('AAAAAAAAAAAAAAAAAAAAA');
  // Expect to see 20 characters
  expect(getValue(detailsPage.firstName)).toEqual('AAAAAAAAAAAAAAAAAAAA');  
  detailsPage.firstName.clear();

  detailsPage.firstName.sendKeys('"Kyle"');
  detailsPage.topMargin.click();
  expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
  detailsPage.firstName.clear();

  // Works on Browsers
  //detailsPage.firstName.sendKeys("'Kyle'");
  //detailsPage.topMargin.click();
  //expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
  //detailsPage.firstName.clear();

  detailsPage.firstName.sendKeys('[Kyle]');
  detailsPage.topMargin.click();
  expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
  detailsPage.firstName.clear();

  detailsPage.firstName.sendKeys("<!--Kyle-->");
  detailsPage.topMargin.click();
  expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
  detailsPage.firstName.clear();

  detailsPage.firstName.sendKeys("(Kyle)");
  detailsPage.topMargin.click();
  expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
  detailsPage.firstName.clear();

  detailsPage.firstName.sendKeys('Kyle&Kyle');
  detailsPage.topMargin.click();
  expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
  detailsPage.firstName.clear();

  detailsPage.firstName.sendKeys('C:\Windows');
  detailsPage.topMargin.click();
  expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
  detailsPage.firstName.clear();

  detailsPage.firstName.sendKeys('Kyle#');
  detailsPage.topMargin.click();
  expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
  detailsPage.firstName.clear();

  detailsPage.firstName.sendKeys('Kyle|Kyle');
  detailsPage.topMargin.click();
  expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
  detailsPage.firstName.clear(); 

  // Works on Browsers
  //detailsPage.firstName.sendKeys("Kyle'");
  //detailsPage.topMargin.click();
  //expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
  //detailsPage.firstName.clear();

  // Works on Browsers
  //detailsPage.firstName.sendKeys('Kyle-');
  //detailsPage.topMargin.click();
  //expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
  //detailsPage.firstName.clear();

  detailsPage.firstName.clear();
  detailsPage.firstName.sendKeys("Kyle");
  expect(getValue(detailsPage.firstName)).toEqual('Kyle');  
  });  
    
  it('Check Surname Validation', function() {
    expect(detailsPage.surname.getAttribute('value')).toEqual('');
    detailsPage.surname.click();
    detailsPage.topMargin.click();
    expect(detailsPage.error_message.isPresent()).toBe(true);
    expect(detailsPage.error_message.getText()).toEqual('Required Field');
    detailsPage.surname.sendKeys('A');
    detailsPage.topMargin.click();
    expect(detailsPage.error_message.isPresent()).toBe(true);
    expect(detailsPage.error_message.getText()).toEqual('Must be at least 2 characters long.');
    detailsPage.surname.clear();
    // 21 Characters
    detailsPage.surname.sendKeys('AAAAAAAAAAAAAAAAAAAAA');
    // Expect to see 20 characters
    expect(detailsPage.surname.getAttribute('value')).toEqual('AAAAAAAAAAAAAAAAAAAA');
    detailsPage.surname.clear();

    detailsPage.surname.sendKeys('"Brewer-Allan"');
    detailsPage.topMargin.click();
    expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
    detailsPage.surname.clear();

    // Not working on browsers
    //detailsPage.surname.sendKeys("'Brewer-Allan'");
    //detailsPage.topMargin.click();
    //expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
    //detailsPage.surname.clear();

    detailsPage.surname.sendKeys('[Brewer-Allan]');
    detailsPage.topMargin.click();
    expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
    detailsPage.surname.clear();

    detailsPage.surname.sendKeys('<!--Kyle-->');
    detailsPage.topMargin.click();
    expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
    detailsPage.surname.clear();

    detailsPage.surname.sendKeys("(Brewer-Allan)");
    detailsPage.topMargin.click();
    expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
    detailsPage.surname.clear();

    detailsPage.surname.sendKeys('Brewer&Allan');
    detailsPage.topMargin.click();
    expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
    detailsPage.surname.clear();

    detailsPage.surname.sendKeys('C:\Windows');
    detailsPage.topMargin.click();
    expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
    detailsPage.surname.clear();

    detailsPage.surname.sendKeys('Brewer-Allan#');
    detailsPage.topMargin.click();
    expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
    detailsPage.surname.clear();

    detailsPage.surname.sendKeys('Brewer|Allan');
    detailsPage.topMargin.click();
    expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
    detailsPage.surname.clear();

    // Works on Browsers
    //detailsPage.surname.sendKeys("Brewer-Allan'");
    //detailsPage.topMargin.click();
    //expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
    //detailsPage.surname.clear();

    // Works on Browsers
    //detailsPage.surname.sendKeys('Brewer-Allan-');
    //detailsPage.topMargin.click();
    //expect(detailsPage.error_message.getText()).toEqual('Invalid name.');
    //detailsPage.surname.clear();

    detailsPage.surname.sendKeys('Brewer-Allan');
    expect(detailsPage.surname.getAttribute('value')).toEqual('Brewer-Allan');  
  });  
    
  it('Check Email Validation', function() {
    expect(detailsPage.email.getAttribute('value')).toEqual('');
    detailsPage.email.click();
    detailsPage.topMargin.click();
    expect(detailsPage.error_message.isPresent()).toBe(true);
    expect(detailsPage.error_message.getText()).toEqual('Required Field');

    detailsPage.email.sendKeys('A');
    detailsPage.topMargin.click();
    expect(detailsPage.error_message.isPresent()).toBe(true);
    expect(detailsPage.error_message.getText()).toEqual('Sorry! This doesn`t look like a valid email address. Please try again.');
    detailsPage.email.clear();

    detailsPage.email.sendKeys('123');
    detailsPage.topMargin.click();
    expect(detailsPage.error_message.isPresent()).toBe(true);
    expect(detailsPage.error_message.getText()).toEqual('Sorry! This doesn`t look like a valid email address. Please try again.');
    detailsPage.email.clear();

    // No @ symbol
    detailsPage.email.sendKeys('brewerkthewinesociety.co.uk');
    detailsPage.topMargin.click();
    expect(detailsPage.error_message.isPresent()).toBe(true);
    expect(detailsPage.error_message.getText()).toEqual('Sorry! This doesn`t look like a valid email address. Please try again.');
    detailsPage.email.clear();

    // Should Fail, doesn't currently
    /*detailsPage.email.sendKeys('brewerk@thewinesociety');
    detailsPage.topMargin.click();
    expect(detailsPage.error_message.isPresent()).toBe(true);
    expect(detailsPage.error_message.getText()).toEqual('Sorry! This doesn`t look like a valid email address. Please try again.');
    detailsPage.email.clear();*/

    detailsPage.email.sendKeys('brewerk@.co.uk');
    detailsPage.topMargin.click();
    expect(detailsPage.error_message.isPresent()).toBe(true);
    expect(detailsPage.error_message.getText()).toEqual('Sorry! This doesn`t look like a valid email address. Please try again.');
    detailsPage.email.clear();

    detailsPage.email.sendKeys('brewerk@@thewinesociety.co.uk');
    detailsPage.topMargin.click();
    expect(detailsPage.error_message.isPresent()).toBe(true);
    expect(detailsPage.error_message.getText()).toEqual('Sorry! This doesn`t look like a valid email address. Please try again.');
    detailsPage.email.clear();

    detailsPage.email.sendKeys('brewerk@thewinesociety.com');
    expect(detailsPage.email.getAttribute('value')).toEqual('brewerk@thewinesociety.com');
  });  

  it('Check Telephone Validation', function() {
    expect(detailsPage.phone.getAttribute('value')).toEqual('');
    detailsPage.phone.click();
    detailsPage.topMargin.click();
    expect(detailsPage.error_message.isPresent()).toBe(true);
    expect(detailsPage.error_message.getText()).toEqual('Required Field');
    detailsPage.phone.sendKeys('A');
    expect(detailsPage.phone.getAttribute('value')).toEqual('');

    detailsPage.phone.sendKeys('.');
    detailsPage.topMargin.click();
    expect(detailsPage.error_message.isPresent()).toBe(true);
    expect(detailsPage.error_message.getText()).toEqual('Only numbers are allowed.');
    detailsPage.phone.clear();

    detailsPage.phone.sendKeys('771318734');
    detailsPage.topMargin.click();
    expect(detailsPage.error_message.isPresent()).toBe(true);
    expect(detailsPage.error_message.getText()).toEqual('Only numbers are allowed.');
    detailsPage.phone.clear();

    detailsPage.phone.sendKeys('07713187347');
    expect(detailsPage.phone.getAttribute('value')).toEqual('07713187347');
    detailsPage.phone.click();
    // Need to find a better way of identifying the one that is currently active
    expect(detailsPage.info_message.get(4).getText()).toEqual("We will only call you if there's an issue with your account or orders: our team never make any 'cold calls'.");
    elementIsDisplayed(detailsPage.info_message.get(4));
  }); 

  it('Check DOB Empty Validation', function() {
    expect(detailsPage.day.getAttribute('value')).toEqual('');
    expect(detailsPage.month.getAttribute('value')).toEqual('');
    expect(detailsPage.year.getAttribute('value')).toEqual('');
  }); 

  it('Check DOB too Young Validation', function() {
    var youngYear =  (dt.getFullYear()-1).toString();
    detailsPage.day.sendKeys('17');
    detailsPage.month.sendKeys('01');
    detailsPage.year.sendKeys(youngYear);

    detailsPage.topMargin.click();
    expect(detailsPage.error_message.isPresent()).toBe(true);
    expect(detailsPage.error_message.getText()).toEqual('You must be over the age of 18 to join, you are currently 1.');

    clearDOB(detailsPage);
  }); 

  it('Check DOB too Old Validation', function() {
    var oldYear =  (dt.getFullYear()-111).toString();
    detailsPage.day.sendKeys('17');
    detailsPage.month.sendKeys('01');
    detailsPage.year.sendKeys(oldYear);

    detailsPage.topMargin.click();
    expect(detailsPage.error_message.isPresent()).toBe(true);
    expect(detailsPage.error_message.getText()).toEqual('The date of birth entered indicates that you might be 111.');

    clearDOB(detailsPage);
  }); 

  it('Check DOB Invalid Format', function() {
    clearDOB(detailsPage);

    detailsPage.day.sendKeys('..');
    detailsPage.month.sendKeys('..');
    detailsPage.year.sendKeys('..');

    detailsPage.topMargin.click();
    expect(detailsPage.error_message.isPresent()).toBe(true);
    expect(detailsPage.error_message.getText()).toEqual('The date entered is not valid.');

    clearDOB(detailsPage);

    detailsPage.year.sendKeys('1996');
    detailsPage.month.sendKeys('08');
    detailsPage.day.sendKeys('17');
  });

  it('Check DOB Value', function() {
    clearDOB(detailsPage);
    detailsPage.year.sendKeys('1996');
    detailsPage.month.sendKeys('08');
    detailsPage.day.sendKeys('17');

    expect(detailsPage.year.getAttribute('value')).toEqual('1996');
    expect(detailsPage.month.getAttribute('value')).toEqual('08');
    expect(detailsPage.day.getAttribute('value')).toEqual('17');
  });

  it('Check No Lookup Postcode Button State', function() {
    expect(detailsPage.postcode.getAttribute('value')).toEqual('');
    //expect(detailsPage.findAddressButton.isEnabled()).toBe(false);
    detailsPage.postcode.sendKeys('SG54NE');
    browser.waitForAngular();
    expect(detailsPage.findAddressButton.isEnabled()).toBe(true);
    detailsPage.postcode.clear();
    browser.waitForAngular();
    //expect(detailsPage.findAddressButton.isEnabled()).toBe(false);
    detailsPage.postcode.sendKeys('SG54NE');
    detailsPage.findAddressButton.click();
  });

  it('Check Address fields present', function() {
    detailsPage.addressList.$('[value="21920834.00"]').click();
    expect(detailsPage.addressLine1.isDisplayed()).toBe(true);
    expect(detailsPage.addressLine2.isDisplayed()).toBe(true);
    expect(detailsPage.addressLine3.isDisplayed()).toBe(true);
    expect(detailsPage.addressTown.isDisplayed()).toBe(true);
    expect(detailsPage.addressCounty.isDisplayed()).toBe(true);
    expect(detailsPage.addressPostcode.isDisplayed()).toBe(true);
    expect(detailsPage.clearAddressButton.isDisplayed()).toBe(true);
    expect(detailsPage.userAddressLookupButton.isDisplayed()).toBe(true);
    detailsPage.userAddressLookupButton.click();
    // detailsPage.houseNumber.clear();
    detailsPage.postcode.clear();
    detailsPage.postcode.sendKeys('SG54NE');
    // detailsPage.houseNumber.sendKeys('48');
    detailsPage.findAddressButton.click();
    detailsPage.addressList.$('[value="21920834.00"]').click();
  });

  it('Check Address fields values', function() {
    expect(detailsPage.addressLine1.getAttribute('value')).toEqual('');
    expect(detailsPage.addressLine2.getAttribute('value')).toEqual('48 Church Road');
    expect(detailsPage.addressLine3.getAttribute('value')).toEqual('Stotfold ');
    expect(detailsPage.addressTown.getAttribute('value')).toEqual('Hitchin');
    expect(detailsPage.addressCounty.getAttribute('value')).toEqual('Bedfordshire');
    expect(detailsPage.addressPostcode.getAttribute('value')).toEqual('SG5 4NE');
  });

  it('Check Address Line 1', function() {
  });

  it('Check Manditory Address Line 2', function() {
    detailsPage.addressLine2.click();
    detailsPage.addressLine2.clear();
    detailsPage.topMargin.click();
    // elementIsDisplayed(detailsPage.error_message);
    //expect(detailsPage.error_messages.count() == 1);
    //expect(detailsPage.error_message.getText()).toEqual('Required Field');
    detailsPage.addressLine2.sendKeys('48 Church Road');
  });

  it('Check Address Line 3', function() {
    detailsPage.addressLine3.clear();
    
    detailsPage.topMargin.click();
    detailsPage.addressLine3.sendKeys('Stotfold');
  });

  it('Check Manditory Address Town/City', function() {
    detailsPage.addressTown.click();
    detailsPage.addressTown.clear();
    detailsPage.topMargin.click();
    // elementIsDisplayed(detailsPage.error_message);
    //expect(detailsPage.error_messages.count() == 1);
    //expect(detailsPage.error_message.getText()).toEqual('Required Field');
    detailsPage.addressTown.sendKeys('Hitchin');
  });

  it('Check Address County', function() {
    detailsPage.addressCounty.clear();
    detailsPage.topMargin.click();
    detailsPage.addressCounty.sendKeys('Bedfordshire');
  });

  it('Check Manditory Address Postcode', function() {
    detailsPage.addressTown.click();
    detailsPage.addressPostcode.clear();
    detailsPage.topMargin.click();
    // elementIsDisplayed(detailsPage.error_message);
    //expect(detailsPage.error_messages.count() == 1);
    //expect(detailsPage.error_message.getText()).toEqual('Required Field');
    detailsPage.addressPostcode.sendKeys('SG5 4NE');
  });

  it('Check Society Confirmation Section', function() {
    elementIsDisplayed(detailsPage.nextButton);
    expect(detailsPage.nextButton.isEnabled == false);
    var labelText = detailsPage.confirmLabel.getText();
    expect(labelText ==  "I confirm that the person named above will accept a share subject to the Rules of The Wine Society, and that The Wine Society reserves the right to validate applications. ")
    detailsPage.confirmLabel.click();
    expect(detailsPage.nextButton.isEnabled == true);
  });


  it('Check Next button navigation', function() {
    clickElement(detailsPage.nextButton);
    browser.waitForAngular();
    expect(browser.getCurrentUrl()).toEqual("https://dev.thewinesociety.com/applicationform2/self/step2");
  });

  // Add Progress bar Check
  // Add Progress bar 

  it('Check Payment Fields are present', function() {
    elementIsDisplayed(paymentPage.cardHoldersName);
    elementIsDisplayed(paymentPage.cardNumber);
    elementIsDisplayed(paymentPage.expiryMonth);
    elementIsDisplayed(paymentPage.expiryYear);
    elementIsDisplayed(paymentPage.securityCode);
  });

  it('Check Payment Fields Place holders', function() {
      // expect(element(by.css('[for="tbCardHolderName"]')).getAttribute("placehodler")).toEqual("CARD HOLDERS NAME");
  });

  it('Validate Card Holders Name', function() {
    // Waiting for special characters to be re - allowed
  });

  it('Validate Card Number', function() {
    var cardNumber = element(by.id('tbCardNumber'));
    
    paymentPage.cardNumber.click();
    clickElement(paymentPage.topMargin);
    expect(paymentPage.error_message.getText()).toEqual('Required Field');

    paymentPage.cardNumber.sendKeys('..');
    clickElement(paymentPage.topMargin);
    expect(paymentPage.error_message.getText()).toEqual('Required Field');

    paymentPage.cardNumber.clear();
    paymentPage.cardNumber.sendKeys('12');
    clickElement(paymentPage.topMargin);
    expect(paymentPage.error_message.getText()).toEqual('Is invalid credit card number');

    paymentPage.cardNumber.clear();
    paymentPage.cardNumber.sendKeys('4242424242424242');
  });

});