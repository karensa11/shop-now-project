const TestData = {
    siteName: "Shop Now",
    userData: {
        testEmail: "t@gmail.com",
        testPassword: "abcdBF",
        testName: "Tom Cruise",
        adminEmail: "admin1@gmail.com",
        adminPassword: "abcdFH",
        adminName: "Admin Admin"
    },
    catalogData: {
        selectedCategoryLabel: 'phones',
        selectedCatalogItem1Name: 'iPhone 11',
        selectedCatalogItem2Name: 'iPhone 12',
        searchText: 'iphone'
    },
    notificationData: {
        userNotificationRegex: /User with id [0-9]+ created/,
        orderNotificationRegex: /Order [0-9]+ created/,
        orderCancelledNotificationRegex: /Order [0-9]+ cancelled/
    }
};
const Elements = {
    tabs: {
    }
};
module.exports = {TestData, Elements};