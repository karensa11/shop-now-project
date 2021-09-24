const {By, until, Key} = require('selenium-webdriver');
const { expect } = require('chai');
const fileUtils = require('../lib/fileUtils');
const logger = require('./logUtils');
const config = require('../../config');
const uuid = require('uuid-random');
const reportFileUtils = require('../report/reportFileUtils');
const reporter = require('../report/listener.js');

function writeScreenshot(data, runData) {
    const imageId = uuid();
    fileUtils.createDirectoryIfNotExists(reportFileUtils.screenshotsFolder());
    fileUtils.writeImage(data, reportFileUtils.imageFile(imageId));
    logger.log('IMAGE '+imageId, runData);
}
async function _click(driver, runData, by) {
    await driver.wait(until.elementLocated(by));
    await this.takeScreenshot(driver, runData);
    await driver.findElement(by).click();
}

module.exports = {
    elementExits: async function(driver, runData, id) {
        let exists = false;
        await driver.findElements(By.id(id)).then(function(elements) {
            if(elements.length > 0){
                exists = true;
            }
        });
        return exists;
    },

    takeScreenshot: async function(driver, runData) {
        await driver.sleep(driver, runData, 1500);
        driver.takeScreenshot().then(function (data) {
            writeScreenshot(data, runData);
        });
    },

    openClient: async function(driver, runData) {
        logger.log('opening '+config.clientUrl, runData);
        await driver.get(config.clientUrl);
        logger.log('opened ', runData);
        const sessionId = await driver.executeScript(
            `return window.sessionStorage.getItem("sessionId");`
        );
        console.log(sessionId);
        console.log("reporter", reporter.setSessionId);
        reporter.setSessionId(sessionId);
    },

    resize: async function(driver, runData, percentage) {
        await driver.executeScript("document.body.style.zoom='"+percentage+"%'");
    },

    clickById: async function(driver, runData, id) {
        logger.log('click button with id '+id, runData);
        await driver.wait(until.elementLocated(By.id(id)));
        await this.takeScreenshot(driver, runData);
        await driver.findElement(By.id(id)).click();
    },

    clickByClassName: async function(driver, runData, className) {
        logger.log('click button with className '+className, runData);

        await driver.wait(until.elementLocated(By.className(className)));
        await this.takeScreenshot(driver, runData);
        await driver.findElement(By.className(className)).click();
    },

    clickByText: async function(driver, runData, text, elementType) {
        logger.log('click button with text '+text+' and element type '+elementType, runData);

        await driver.wait(until.elementLocated(By.xpath("//"+elementType+"[text()='"+text+"']")));
        await this.takeScreenshot(driver, runData);
        await driver.findElement(By.xpath("//"+elementType+"[text()='"+text+"']")).click();
    },

    clickPoint:  async function(driver, runData, x, y) {
        await driver.actions()
                    .move({x:x, y:y})
                    .press()
                    .release()
                    .perform();
        await this.takeScreenshot(driver, runData);
    },

    validateAlertAndClick:  async function(driver, runData, expectedAlertText) {
        logger.log('verify alert opens', runData);
        await driver.wait(until.alertIsPresent());
        const alert = await driver.switchTo().alert();
        await driver.switchTo().alert();
        const alertText = await alert.getText();
        logger.log('verify txt of alert equals '+expectedAlertText, runData);
        expect(alertText).to.equal(expectedAlertText);
        await alert.accept();
    },

    populateInput: async function(driver, runData, id, value) {
        logger.log('populate input with id '+id+', text '+value, runData);

        await driver.wait(until.elementLocated(By.id(id)));
        await this.takeScreenshot(driver, runData);
        await driver.findElement(By.id(id)).clear();
        await driver.findElement(By.id(id)).sendKeys(value);
        await this.takeScreenshot(driver, runData);
    },

    selectOptionByCode: async function(driver, runData, id, code) {
        logger.log('populate input with id '+id+', code '+code, runData);

        await driver.findElement(By.id(id)).sendKeys(code);
        await this.takeScreenshot(driver, runData);
    },

    pressEnter: async function(driver, runData, id) {
        logger.log('press enter for ' + id, runData);

        driver.findElement(By.id(id)).sendKeys(Key.ENTER);
    },

    getTxt: async function(driver, runData, id) {
        logger.log('get label of element with id '+id, runData);

        await driver.wait(until.elementLocated(By.id(id)));
        await this.takeScreenshot(driver, runData);
        const value = driver.findElement(By.id(id)).getText();
        return value;
    },

    getIdByTxt: async function(driver, runData, txt, elementType) {
        logger.log('get id of element with txt '+txt, runData);
        const value = txt;//.split(' ')[1];

        let id = null;
        await driver.findElements(By.xpath(`//${elementType}[text() ='${value}']`)).then(function(elements) {
            console.log(elements);
            if (elements.length === 1) {
                elements[0].getAttribute('class').then(value => {
                    id = value;
                    console.log('got result');
                });
            }
        });
        return id;
    },

    assertTxtValue: async function(driver, runData, id, expectedValue) {
        logger.log('verify txt of '+id+' equals '+expectedValue, runData);

        const value = await this.getTxt(driver, runData, id);
        await this.takeScreenshot(driver, runData);
        expect(value).to.equal(expectedValue);
        return value;
    },

    assertElementNotExists: async function(driver, runData, id) {
        logger.log('check if element not exists '+id, runData);

        const exists = await this.elementExits(driver, runData, id);
        await this.takeScreenshot(driver, runData);
        expect(exists).to.equal(false);
    },

    assertElementExists: async function(driver, runData, id) {
        logger.log('check if element exists '+id, runData);

        await this.takeScreenshot(driver, runData);
        await driver.wait(until.elementLocated(By.id(id)));
        await this.takeScreenshot(driver, runData);
    },

    sleep: function(driver, runData, ms=1000) {
        logger.log('sleep for '+ms, runData);
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
}