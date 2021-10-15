const {Builder} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const basicSanityImpl = require('./basicSanityImpl');
const stringUtils = require('../lib/stringUtils');
const testDate = require('../utils/runDate');
const logger = require('../utils/logUtils');

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
            const keys = Object.keys(testMethod);
            const runDataObj = runData(testName);
            for (const key of keys) {
                logger.logTestKey(key, runDataObj);
            }
            for (const key of keys) {
                logger.logTitle(key, runDataObj);
                const method = testMethod[key];
                const startTime = new Date();
                try {
                    await method(driver, runDataObj);
                    logger.logKeysSuccess(key, startTime, runDataObj);
                } catch (err) {
                    console.log("test failed", testName);
                    logger.logKeysFailure(key, startTime, runDataObj);
                    throw err;
                }
            }
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
    runTest('View Notifications', basicSanityImpl.testViewNotifications);
    runTest('Close Order', basicSanityImpl.testCloseOrder);
    runTest('View Account', basicSanityImpl.testViewAccount);
    runTest('Delete User', basicSanityImpl.testDeleteUser);
    runTest('Login Failure', basicSanityImpl.testLoginFailure);

   after(async () => driver.quit());
});


// TODO - negative tests