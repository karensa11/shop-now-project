const {Builder} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const basicSanityImpl = require('./basicSanityImpl');
const stringUtils = require('../lib/stringUtils');
const testDate = require('../utils/runDate');
const driverUtils = require('../utils/driverUtils');

const chromeCapabilities = webdriver.Capabilities.chrome();
const chromeOptions = {
    'w3c': false,
    'args': ['--test-type', '--start-maximized']
};
chromeCapabilities.set('chromeOptions', chromeOptions);

function runData(testName){
    const testCode = stringUtils.toCammelCase(testName);
    return {
        testDate: testDate,
        testName: testName,
        testCode: testCode
    }
}

describe('Basic Sanity', () => {
    const driver = new Builder().forBrowser("chrome").build();
    driver.manage().window().maximize();

    function runTest(testName, testMethod) {
        it(testName, async () => {
            await testMethod(driver, runData(testName));
        });
    }
    runTest('Open', basicSanityImpl.testInit);
    runTest('Search', basicSanityImpl.testSearch);
    runTest('Register', basicSanityImpl.testRegister);
    runTest('Logout', basicSanityImpl.testLogout);
    runTest('Login', basicSanityImpl.testLogin);
    runTest('Add To Cart', basicSanityImpl.testAddToCart);
    runTest('View Shopping Cart', basicSanityImpl.testViewShoppingCart);
    runTest('Change Items Quantity', basicSanityImpl.testChangeQuantity);
    runTest('View Shopping Cart', basicSanityImpl.testRemoveItem);
    runTest('View Account', basicSanityImpl.testViewAccount);
    runTest('Delete User', basicSanityImpl.testDeleteUser);
    runTest('Login Failure', basicSanityImpl.testLoginFailure);

   after(async () => driver.quit());
});


// TODO - negative tests