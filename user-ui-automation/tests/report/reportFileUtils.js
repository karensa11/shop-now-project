const htmlCreator = require('html-creator');
const fileUtils = require('../lib/fileUtils');
const config = require('../../config');
const testDate = require('../utils/runDate');

module.exports = {
    writeHTML(htmlContent, reportFolder, fileName){
        const html = new htmlCreator(htmlContent);
        const htmlResult = html.renderHTML();

        fileUtils.createDirectoryIfNotExists(reportFolder);
        fileUtils.copyFile(config.resourcesFolder+'styles.css', reportFolder+'styles.css');
        fileUtils.writeTxtInFile(reportFolder+fileName, htmlResult);
    },
    reportFolder(){
        return config.reportsFolder + testDate + '/';
    },
    screenshotsFolder(){
        return this.reportFolder()+'screenshots/';
    },
    logsFolder(){
        return this.reportFolder()+'logs/';
    },
    logFile(testCode){
        return this.logsFolder()+testCode+'.txt';
    },
    imageFile(imageId){
        return this.screenshotsFolder()+imageId+'.png';
    },
    imageFileSrc(imageId){
        return 'screenshots/'+imageId+'.png';
    },
    testFileName(suiteCode, testCode){
        return suiteCode + '_' + testCode + '.html';
    },
    mainFileName(){
        return 'index.html';
    }
};
