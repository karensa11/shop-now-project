const dateFormat = require('dateformat');
const fileUtils = require('../lib/fileUtils');
const reportFileUtils = require('../report/reportFileUtils');
const fs = require('fs');

module.exports = {
    log: function(message, testData){
        const currentDate = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        fileUtils.createDirectoryIfNotExists(reportFileUtils.reportFolder());
        fileUtils.createDirectoryIfNotExists(reportFileUtils.logsFolder());
        fs.appendFileSync(
            reportFileUtils.logFile(testData.testCode),
            currentDate+' | '+message+'\n');
        console.log(currentDate+' | '+message);
    }
};
