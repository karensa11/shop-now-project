const basicSanityImplUtils = require('./basicSanityImplUtils');
const driverUtils = require('../utils/driverUtils');
const {TestData} = require('./testData');

module.exports = {

    testInit: async function(driver, runData) {
        await basicSanityImplUtils.init(driver, runData);
    },
    testRegister: async function(driver, runData) {
        const {userData} = TestData;
        await driverUtils.clickById(driver, runData, 'registerBtn');
        await driverUtils.populateInput(driver, runData, 'emailInput', userData.testEmail);
        await driverUtils.populateInput(driver, runData, 'nameInput', userData.testName);
        await driverUtils.populateInput(driver, runData, 'passwordInput', userData.testPassword);
        await driverUtils.populateInput(driver, runData, 'confirmPasswordInput', userData.testPassword);
        await driverUtils.clickById(driver, runData, 'submitRegisterBtn');
        await driverUtils.assertTxtValue(driver, runData, 'nameLbl', userData.testName);
    },
    testLogout: async function(driver, runData) {
        await driverUtils.clickById(driver, runData, 'logoutBtn');
        await driverUtils.assertTxtValue(driver, runData, 'nameLbl', 'guest');
    },
    testLogin: async function(driver, runData) {
        const {userData} = TestData;
        await driverUtils.clickById(driver, runData, 'loginBtn');
        await driverUtils.populateInput(driver, runData, 'emailInput', userData.testEmail);
        await driverUtils.populateInput(driver, runData, 'passwordInput', userData.testPassword);
        await driverUtils.clickById(driver, runData, 'submitLoginBtn');
        await driverUtils.assertTxtValue(driver, runData, 'nameLbl', userData.testName);
    },
    testSearch: async function(driver, runData) {
        const {catalogData} = TestData;
        await basicSanityImplUtils.verifyCartCount(driver, runData, 0);
        await driverUtils.populateInput(driver, runData, 'searchInput', catalogData.searchText);
        await driverUtils.clickById(driver, runData, 'searchBtn');
        await driverUtils.assertTxtValue(driver, runData, 'searchTextLbl', catalogData.searchText);
        await driverUtils.assertTxtValue(driver, runData, 'searchResultName0Lbl', catalogData.selectedCatalogItem1Name);
        await driverUtils.clickById(driver, runData, 'searchResultAddToCart0Btn');
        await basicSanityImplUtils.verifyCartCount(driver, runData, 1);
    },
    testAddToCart: async function(driver, runData) {
        const {catalogData} = TestData;
        // check existing cart items //
        await basicSanityImplUtils.verifyCartCount(driver, runData, 0);
        // browse to catalog item //
        await driverUtils.assertTxtValue(driver, runData, 'category1Btn', catalogData.selectedCategoryLabel);
        await driverUtils.clickById(driver, runData, 'category1Btn');
        // add catalog item to cart and check updated //
        await driverUtils.assertTxtValue(driver, runData, 'catalogItemName1Lbl', catalogData.selectedCatalogItem1Name);
        await driverUtils.clickById(driver, runData, 'addToCart1Btn');
        await driverUtils.sleep(driver, runData);
        await basicSanityImplUtils.verifyCartCount(driver, runData, 1);
        // add another catalog item to cart and check updated //
        await driverUtils.assertTxtValue(driver, runData, 'catalogItemName2Lbl', catalogData.selectedCatalogItem2Name);
        await driverUtils.clickById(driver, runData, 'addToCart2Btn');
        await driverUtils.sleep(driver, runData);
        await basicSanityImplUtils.verifyCartCount(driver, runData, 2);
    },
    testViewShoppingCart: async function(driver, runData) {
        // navigate to shopping cart //
        await driverUtils.clickById(driver, runData, 'viewShoppingCartBtn');
        // check shopping cart content //
        await driverUtils.assertTxtValue(driver, runData, 'shoppingCartLbl', 'Your cart');
        await driverUtils.assertTxtValue(driver, runData, 'shoppingCartItemsNumberLbl', '2');
    },
    testChangeQuantity: async function(driver, runData) {
        await driverUtils.clickById(driver, runData, 'increase0Btn');
        await basicSanityImplUtils.verifyShoppingCartCount(driver, runData, 3);
        await driverUtils.clickById(driver, runData, 'increase0Btn');
        await basicSanityImplUtils.verifyShoppingCartCount(driver, runData, 4);
        await driverUtils.clickById(driver, runData, 'increase1Btn');
        await basicSanityImplUtils.verifyShoppingCartCount(driver, runData, 5);
        await driverUtils.clickById(driver, runData, 'decrease1Btn');
        await basicSanityImplUtils.verifyShoppingCartCount(driver, runData, 4);
    },
    testRemoveItem: async function(driver, runData) {
        await driverUtils.clickById(driver, runData, 'remove1Btn');
        await basicSanityImplUtils.verifyShoppingCartCount(driver, runData, 3);
        await driverUtils.clickById(driver, runData, 'remove0Btn');
        await driverUtils.assertTxtValue(driver, runData, 'noItemsLbl', 'No items in cart');
    },
    testViewAccount: async function(driver, runData) {
        const {userData} = TestData;
        await driverUtils.clickById(driver, runData, 'accountBtn');
        await driverUtils.assertTxtValue(driver, runData, 'nameLbl', userData.testName);
        await driverUtils.assertTxtValue(driver, runData, 'emailLbl', userData.testEmail);
    },
    testDeleteUser: async function(driver, runData) {
        await driverUtils.clickById(driver, runData, 'deleteAccountBtn');
        await driverUtils.assertTxtValue(driver, runData, 'nameLbl', 'guest');
    },
    testLoginFailure: async function(driver, runData) {
        const {userData} = TestData;
        await driverUtils.clickById(driver, runData, 'loginBtn');
        await driverUtils.populateInput(driver, runData, 'emailInput', userData.testEmail);
        await driverUtils.populateInput(driver, runData, 'passwordInput', userData.testPassword);
        await driverUtils.clickById(driver, runData, 'submitLoginBtn');
        await driverUtils.validateAlertAndClick(driver, runData, 'user not found or password is wrong');
    },
};
