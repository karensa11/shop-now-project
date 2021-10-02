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
    const chromeCapabilities = webdriver.Capabilities.chrome();
    const chromeOptions = {
        w3c: false,
        args: ['--test-type', '--start-maximized', '--disable-web-security']
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    const driver = new Builder().withCapabilities(chromeCapabilities).build();

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
    runTest('Remove Items', basicSanityImpl.testRemoveItem);
    runTest('Cancel Order', basicSanityImpl.testCancelOrder);
    runTest('Place Order', basicSanityImpl.testPlaceOrder);
    runTest('Login Admin', basicSanityImpl.testLoginAdmin);
    runTest('Close Order', basicSanityImpl.testCloseOrder);
    runTest('View Account', basicSanityImpl.testViewAccount);
    runTest('Delete User', basicSanityImpl.testDeleteUser);
    runTest('Login Failure', basicSanityImpl.testLoginFailure);

   after(async () => driver.quit());
});


// TODO - negative tests