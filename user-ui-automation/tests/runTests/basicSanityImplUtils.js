const driverUtils = require('../utils/driverUtils');
const {TestData, Elements} = require('./testData');

module.exports = {
    restId: function(restName) {
        return restName.replace(" ", "_").replace(/\//g, "_");
    },

    init: async function (driver, runData){
        await driverUtils.openClient(driver, runData);
    }
}