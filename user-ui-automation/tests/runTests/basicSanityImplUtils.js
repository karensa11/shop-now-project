const driverUtils = require('../utils/driverUtils');

module.exports = {
    restId: function(restName) {
        return restName.replace(" ", "_").replace(/\//g, "_");
    },
    init: async function (driver, runData){
        await driverUtils.openClient(driver, runData);
    },
    verifyCartCount:  async function (driver, runData, count){
        await driverUtils.assertTxtValue(driver, runData, 'cartItemsNumber', count+'');
    },
    verifyShoppingCartCount:  async function (driver, runData, count){
        await driverUtils.sleep(driver, runData);
        await driverUtils.assertTxtValue(driver, runData, 'shoppingCartItemsNumberLbl', count+'');
    },
    login:  async function (driver, runData, email, password){
        await driverUtils.clickById(driver, runData, 'loginBtn');
        await driverUtils.populateInput(driver, runData, 'emailInput', email);
        await driverUtils.populateInput(driver, runData, 'passwordInput', password);
        await driverUtils.clickById(driver, runData, 'submitLoginBtn');
    }
};
