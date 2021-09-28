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
        await driverUtils.sleep(driver, runData);
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
    testCancelOrder: async function(driver, runData) {
        // add items to cart //
        await driverUtils.clickById(driver, runData, 'logoBtn');
        const {catalogData} = TestData;
        await basicSanityImplUtils.verifyCartCount(driver, runData, 0);
        await driverUtils.assertTxtValue(driver, runData, 'category1Btn', catalogData.selectedCategoryLabel);
        await driverUtils.clickById(driver, runData, 'category1Btn');
        await driverUtils.clickById(driver, runData, 'addToCart1Btn');
        await driverUtils.sleep(driver, runData);
        await basicSanityImplUtils.verifyCartCount(driver, runData, 1);
        // view cart and cancel order //
        await driverUtils.clickById(driver, runData, 'viewShoppingCartBtn');
        await driverUtils.clickById(driver, runData, 'cancelOrderBtn');
        await driverUtils.sleep(driver, runData);
        await driverUtils.assertTxtValue(driver, runData, 'noItemsLbl', 'No items in cart');
    },
    testPlaceOrder: async function(driver, runData) {
        // add items to cart //
        await driverUtils.clickById(driver, runData, 'logoBtn');
        const {catalogData} = TestData;
        await basicSanityImplUtils.verifyCartCount(driver, runData, 0);
        await driverUtils.assertTxtValue(driver, runData, 'category1Btn', catalogData.selectedCategoryLabel);
        await driverUtils.clickById(driver, runData, 'category1Btn');
        await driverUtils.clickById(driver, runData, 'addToCart1Btn');
        await driverUtils.sleep(driver, runData);
        await basicSanityImplUtils.verifyCartCount(driver, runData, 1);
        // view cart and cancel order //
        await driverUtils.clickById(driver, runData, 'viewShoppingCartBtn');
        await driverUtils.clickById(driver, runData, 'placeOrderBtn');
        await driverUtils.sleep(driver, runData);
        await driverUtils.validateAlertAndClick(driver, runData, 'Your order placed with success');
        await driverUtils.assertTxtValue(driver, runData, 'noItemsLbl', 'No items in cart');
    },
    testCloseOrder: async function(driver, runData) {
        // logout //
       // await driverUtils.clickById(driver, runData, 'logoutBtn');
        // await driverUtils.assertTxtValue(driver, runData, 'nameLbl', 'guest');
        // login as admin //
        const {userData} = TestData;
        await driverUtils.clickById(driver, runData, 'loginBtn');
        await driverUtils.populateInput(driver, runData, 'emailInput', userData.adminEmail);
        await driverUtils.populateInput(driver, runData, 'passwordInput', userData.adminPassword);
        await driverUtils.clickById(driver, runData, 'submitLoginBtn');
        await driverUtils.assertTxtValue(driver, runData, 'adminNameLbl', userData.adminName);
    },
    testViewAccount: async function(driver, runData) {
        const {userData} = TestData;
        const {catalogData} = TestData;
        await driverUtils.clickById(driver, runData, 'accountBtn');
        // account details //
        await driverUtils.assertTxtValue(driver, runData, 'nameLbl', userData.testName);
        await driverUtils.assertTxtValue(driver, runData, 'emailLbl', userData.testEmail);
        // order history //
        await driverUtils.assertTxtValue(driver, runData, 'itemName00Lbl', catalogData.selectedCatalogItem1Name);
        await driverUtils.assertTxtValue(driver, runData, 'itemName10Lbl', catalogData.selectedCatalogItem1Name);
    },
    testDeleteUser: async function(driver, runData) {
        await driverUtils.clickById(driver, runData, 'deleteAccountBtn');
        await driverUtils.validateAlertAndClick(driver, runData, 'please confirm deletion');
        await driverUtils.assertTxtValue(driver, runData, 'nameLbl', 'guest');
        await driverUtils.sleep(driver, runData);
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
