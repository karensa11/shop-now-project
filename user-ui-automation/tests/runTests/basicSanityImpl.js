const basicSanityImplUtils = require('./basicSanityImplUtils');
const driverUtils = require('../utils/driverUtils');
const {TestData} = require('./testData');
const logger = require('../utils/logUtils');

module.exports = {
    testInit: {
        INIT: async function(driver, runData) {
            await basicSanityImplUtils.init(driver, runData);
        },
    },
    testRegister: {
        "REGISTER": async function (driver, runData) {
            const {userData} = TestData;
            await driverUtils.clickById(driver, runData, 'registerBtn');
            await driverUtils.populateInput(driver, runData, 'emailInput', userData.testEmail);
            await driverUtils.populateInput(driver, runData, 'nameInput', userData.testName);
            await driverUtils.populateInput(driver, runData, 'passwordInput', userData.testPassword);
            await driverUtils.populateInput(driver, runData, 'confirmPasswordInput', userData.testPassword);
            await driverUtils.clickById(driver, runData, 'submitRegisterBtn');
            await driverUtils.assertTxtValue(driver, runData, 'nameLbl', userData.testName);
        }
    },
    testLogout: {
        "LOGOUT": async function (driver, runData) {
            const {userData} = TestData;
            await driverUtils.clickById(driver, runData, 'logoutBtn');
            await driverUtils.assertTxtValue(driver, runData, 'nameLbl', 'guest');
        }
    },
    testLogin: {
        "LOGIN": async function (driver, runData) {
            const {userData} = TestData;
            await basicSanityImplUtils.login(driver, runData, userData.testEmail, userData.testPassword);
            await driverUtils.assertTxtValue(driver, runData, 'nameLbl', userData.testName);
        }
    },
    testSearch: {
        "SEARCH ITEM": async function (driver, runData) {
            const {catalogData} = TestData;
            await basicSanityImplUtils.verifyCartCount(driver, runData, 0);
            await driverUtils.populateInput(driver, runData, 'searchInput', catalogData.searchText);
            await driverUtils.clickById(driver, runData, 'searchBtn');
            await driverUtils.assertTxtValue(driver, runData, 'searchTextLbl', catalogData.searchText);
            await driverUtils.assertTxtValue(driver, runData, 'searchResultName0Lbl', catalogData.selectedCatalogItem1Name);
        },
        "ADD RESULT ITEM TO CART": async function (driver, runData) {
            const {catalogData} = TestData;
            await driverUtils.clickById(driver, runData, 'searchResultAddToCart0Btn');
            await driverUtils.sleep(driver, runData);
            await basicSanityImplUtils.verifyCartCount(driver, runData, 1);
        }
    },
    testCartAssociatedToUser: {
        "CHECK EXISTING CART ITEMS" : async function(driver, runData) {
            const {catalogData} = TestData;
            await basicSanityImplUtils.verifyCartCount(driver, runData, 1);
        },
    },
    testAddToCart: {
        "BROWSE CATALOG ITEM" : async function(driver, runData) {
            const {catalogData} = TestData;
            await driverUtils.assertTxtValue(driver, runData, 'category1Btn', catalogData.selectedCategoryLabel);
            await driverUtils.clickById(driver, runData, 'category1Btn');
        },
        "ADD CATALOG ITEM TO CART": async function(driver, runData) {
            const {catalogData} = TestData;
            await driverUtils.assertTxtValue(driver, runData, 'catalogItemName1Lbl', catalogData.selectedCatalogItem1Name);
            await driverUtils.clickById(driver, runData, 'addToCart1Btn');
            await driverUtils.sleep(driver, runData);
            await basicSanityImplUtils.verifyCartCount(driver, runData, 2);
        },
        "ADD ANOTHER CATALOG ITEM TO CART": async function(driver, runData) {
            const {catalogData} = TestData;
            await driverUtils.assertTxtValue(driver, runData, 'catalogItemName2Lbl', catalogData.selectedCatalogItem2Name);
            await driverUtils.clickById(driver, runData, 'addToCart2Btn');
            await driverUtils.sleep(driver, runData);
            await basicSanityImplUtils.verifyCartCount(driver, runData, 3);
        }
    },
    testViewShoppingCart: {
        "NAVIGATE TO SHOPPING CART": async function(driver, runData) {
            await driverUtils.clickById(driver, runData, 'viewShoppingCartBtn');
        },
        "CHECK SHOPPING CART CONTENT": async function(driver, runData) {
            await driverUtils.assertTxtValue(driver, runData, 'shoppingCartLbl', 'Your cart');
            await driverUtils.assertTxtValue(driver, runData, 'shoppingCartItemsNumberLbl', '3');
        }
    },
    testChangeQuantity: {
        "INCREASE ITEM 1 QUANTITY": async function(driver, runData) {
            await driverUtils.clickById(driver, runData, 'increase0Btn');
            await basicSanityImplUtils.verifyShoppingCartCount(driver, runData, 4);
            await driverUtils.clickById(driver, runData, 'increase0Btn');
            await basicSanityImplUtils.verifyShoppingCartCount(driver, runData, 5);
        },
        "INCREASE ITEM 2 QUANTITY": async function(driver, runData) {
            await driverUtils.clickById(driver, runData, 'increase1Btn');
            await basicSanityImplUtils.verifyShoppingCartCount(driver, runData, 6);
        },
        "DECREASE ITEM 2 QUANTITY": async function(driver, runData) {
            await driverUtils.clickById(driver, runData, 'decrease1Btn');
            await basicSanityImplUtils.verifyShoppingCartCount(driver, runData, 5);
        }
    },
    testRemoveItem: {
        "REMOVE ITEMS": async function(driver, runData) {
            await driverUtils.clickById(driver, runData, 'remove1Btn');
            await basicSanityImplUtils.verifyShoppingCartCount(driver, runData, 4);
            await driverUtils.clickById(driver, runData, 'remove0Btn');
        },
        "CHECK CART IS EMPTY": async function(driver, runData) {
            await driverUtils.assertTxtValue(driver, runData, 'noItemsLbl', 'No items in cart');
        }
    },
    testCancelOrder: {
        "NAVIGATE TO CATALOG": async function(driver, runData) {
            await driverUtils.clickById(driver, runData, 'logoBtn');
            const {catalogData} = TestData;
        },
        "ADD ITEMS TO CART": async function(driver, runData) {
            const {catalogData} = TestData;
            await basicSanityImplUtils.verifyCartCount(driver, runData, 0);
            await driverUtils.assertTxtValue(driver, runData, 'category1Btn', catalogData.selectedCategoryLabel);
            await driverUtils.clickById(driver, runData, 'category1Btn');
            await driverUtils.clickById(driver, runData, 'addToCart1Btn');
            await driverUtils.sleep(driver, runData);
            await basicSanityImplUtils.verifyCartCount(driver, runData, 1);
        },
        "VIEW CART AND CANCEL ORDER": async function(driver, runData) {
            await driverUtils.clickById(driver, runData, 'viewShoppingCartBtn');
            await driverUtils.clickById(driver, runData, 'cancelOrderBtn');
            await driverUtils.sleep(driver, runData);
            await driverUtils.assertTxtValue(driver, runData, 'noItemsLbl', 'No items in cart');
        }
    },
    testPlaceOrder: {
        "ADD ITEMS TO CART": async function(driver, runData) {
            const {catalogData} = TestData;
            await driverUtils.clickById(driver, runData, 'logoBtn');
            await basicSanityImplUtils.verifyCartCount(driver, runData, 0);
            await driverUtils.assertTxtValue(driver, runData, 'category1Btn', catalogData.selectedCategoryLabel);
            await driverUtils.clickById(driver, runData, 'category1Btn');
            await driverUtils.clickById(driver, runData, 'addToCart1Btn');
            await driverUtils.sleep(driver, runData);
            await basicSanityImplUtils.verifyCartCount(driver, runData, 1);
        },
        "VIEW CART AND PLACE ORDER": async function(driver, runData) {
            await driverUtils.clickById(driver, runData, 'viewShoppingCartBtn');
            await driverUtils.clickById(driver, runData, 'placeOrderBtn');
            await driverUtils.sleep(driver, runData);
            await driverUtils.validateAlertAndClick(driver, runData, 'Your order placed with success');
            await driverUtils.assertTxtValue(driver, runData, 'noItemsLbl', 'No items in cart');
        },
        "LOGOUT FROM REGULAR USER": async function(driver, runData) {
            await driverUtils.clickById(driver, runData, 'logoutBtn');
            await driverUtils.assertTxtValue(driver, runData, 'nameLbl', 'guest');
        },
    },
    testLoginAdmin: {
        "LOGIN AS ADMIN": async function(driver, runData) {
            const {userData} = TestData;
            await driverUtils.clickById(driver, runData, 'loginBtn');
            await driverUtils.populateInput(driver, runData, 'emailInput', userData.adminEmail);
            await driverUtils.populateInput(driver, runData, 'passwordInput', userData.adminPassword);
            await driverUtils.clickById(driver, runData, 'submitLoginBtn');
            await driverUtils.assertTxtValue(driver, runData, 'adminNameLbl', userData.adminName);
        }
    },
    testViewNotifications: {
        "VIEW NOTIFICATIONS": async function(driver, runData) {
            const {userData, notificationData} = TestData;
            await driverUtils.clickById(driver, runData, 'viewTransactionsBtn');
            await driverUtils.populateInput(driver, runData, 'emailSearchInput', userData.testEmail);
            await driverUtils.clickById(driver, runData, 'searchNotificationAdminBtn');
            await driverUtils.assertTxtValueRegex(driver, runData, 'notificationMessage0Lbl', notificationData.userNotificationRegex);
            await driverUtils.assertTxtValueRegex(driver, runData, 'notificationMessage1Lbl', notificationData.orderAssociatedNotificationRegex);
            await driverUtils.assertTxtValueRegex(driver, runData, 'notificationMessage2Lbl', notificationData.orderCancelledNotificationRegex);
            await driverUtils.assertTxtValueRegex(driver, runData, 'notificationMessage3Lbl', notificationData.orderNotificationRegex);
        }
    },
    testCloseOrder: {
        "VIEW AND CLOSE ORDER": async function(driver, runData) {
            const {userData} = TestData;
            await driverUtils.clickById(driver, runData, 'handleOrderBtn');
            await driverUtils.populateInput(driver, runData, 'emailSearchInput', userData.testEmail);
            await driverUtils.clickById(driver, runData, 'searchOrderAdminBtn');
            await driverUtils.clickById(driver, runData, 'setDeliveredOn0Btn');
            await driverUtils.clickById(driver, runData, 'adminLogoutBtn');
        }
    },
    testViewAccount: {
        "LOGIN AGAIN TO THE SYSTEM": async function(driver, runData) {
            const {userData} = TestData;
            await basicSanityImplUtils.login(driver, runData, userData.testEmail, userData.testPassword);
            await driverUtils.assertTxtValue(driver, runData, 'nameLbl', userData.testName);
        },
        "GO TO ACCOUNT": async function(driver, runData) {
            await driverUtils.clickById(driver, runData, 'accountBtn');
        },
        "CHECK ACCOUNT DETAILS": async function(driver, runData) {
            const {userData} = TestData;
            await driverUtils.assertTxtValue(driver, runData, 'nameLbl', userData.testName);
            await driverUtils.assertTxtValue(driver, runData, 'emailLbl', userData.testEmail);
        },
        "CHECK ORDER HISTORY": async function(driver, runData) {
            const {catalogData} = TestData;
            await driverUtils.assertTxtValue(driver, runData, 'itemName00Lbl', catalogData.selectedCatalogItem1Name);
            await driverUtils.assertTxtValue(driver, runData, 'itemName10Lbl', catalogData.selectedCatalogItem1Name);
            await driverUtils.assertTxtValue(driver, runData, 'orderStatus0Lbl', 'CANCELLED');
            await driverUtils.assertTxtValue(driver, runData, 'orderStatus1Lbl', 'CANCELLED');
            await driverUtils.assertTxtValue(driver, runData, 'orderStatus2Lbl', 'CLOSED');
        }
    },
    testDeleteUser: {
        "DELETE ACCOUNT": async function(driver, runData) {
            await driverUtils.clickById(driver, runData, 'deleteAccountBtn');
            await driverUtils.validateAlertAndClick(driver, runData, 'please confirm deletion');
            await driverUtils.sleep(driver, runData);
            await driverUtils.assertTxtValue(driver, runData, 'nameLbl', 'guest');
        }
    },
    testLoginFailure: {
        "VERIFY UNABLE TO LOGIN": async function(driver, runData) {
            const {userData} = TestData;
            await driverUtils.clickById(driver, runData, 'loginBtn');
            await driverUtils.populateInput(driver, runData, 'emailInput', userData.testEmail);
            await driverUtils.populateInput(driver, runData, 'passwordInput', userData.testPassword);
            await driverUtils.clickById(driver, runData, 'submitLoginBtn');
            await driverUtils.validateAlertAndClick(driver, runData, 'user not found or password is wrong');
        }
    },
};
