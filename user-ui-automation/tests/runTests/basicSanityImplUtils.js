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
        await driverUtils.assertTxtValue(driver, runData, 'shoppingCartItemsNumberLbl', count+'');
    },
};