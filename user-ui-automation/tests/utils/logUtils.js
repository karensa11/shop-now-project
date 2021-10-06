const dateFormat = require('dateformat');
const fileUtils = require('../lib/fileUtils');
const reportFileUtils = require('../report/reportFileUtils');
const fs = require('fs');

module.exports = {
    logEntries: {
        TITLE: "TITLE",
        IMAGE: "IMAGE"
    },
    logTitle: function(title, testData){
        this.logMessage(this.logEntries.TITLE + ' ' + title, testData);
    },
    log: function(message, testData){
        const currentDate = this.formatDate(new Date());
        this.logMessage(currentDate + ' | ' + message, testData);
    },
    logMessage: function(message, testData){
        this.verifyReportFolder();
        fs.appendFileSync(
            reportFileUtils.logFile(testData.testCode),
            message+'\n');
        console.log(message);
    },
    logTestKey: function(key, testData){
        this.verifyReportFolder();
        fs.appendFileSync(
            reportFileUtils.keysFile(testData.testCode),
            key+'\n');
    },
    logKeysSuccess: function(key, startTime, testData){
        const date = this.formatDate(startTime);
        const duration = new Date().getMilliseconds() - startTime.getMilliseconds();
        this.verifyReportFolder();
        fs.appendFileSync(
            reportFileUtils.keysStatusFile(testData.testCode),
            key+' || SUCCESS || DATE ' + date + ' || DURATION ' + duration + '\n');
    },
    logKeysFailure: function(key, startTime, testData){
        const date = this.formatDate(startTime);
        const duration = new Date().getMilliseconds() - startTime.getMilliseconds();
        this.verifyReportFolder();
        fs.appendFileSync(
            reportFileUtils.keysStatusFile(testData.testCode),
            key+' || FAILURE || DATE ' + date + ' || DURATION ' + duration + '\n');
    },
    verifyReportFolder: function(){
        fileUtils.createDirectoryIfNotExists(reportFileUtils.reportFolder());
        fileUtils.createDirectoryIfNotExists(reportFileUtils.logsFolder());
    },
    formatDate: function(date){
        return dateFormat(date, "yyyy-mm-dd HH:MM:ss");
    }
};
