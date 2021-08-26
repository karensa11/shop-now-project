const indexGenerator = require('./indexGenerator');
const testGenerator = require('./testGenerator');
const fileUtils = require('../lib/fileUtils');
const reportFileUtils = require('./reportFileUtils');
const config = require('../../config');

module.exports = {
    createReport(runInfo) {
        // handle files and folders //
        fileUtils.createDirectoryIfNotExists(reportFileUtils.reportFolder());
        fileUtils.copyFile(config.resourcesFolder + 'styles.css', reportFileUtils.reportFolder() + 'styles.css');

        // create main report //
        const htmlContent = indexGenerator.createDocument(runInfo);
        reportFileUtils.writeHTML(htmlContent, reportFileUtils.reportFolder(), reportFileUtils.mainFileName());

        // create reports for tests //
        Object.keys(runInfo.suites).forEach((suiteCode) => {
            const suite = runInfo.suites[suiteCode];
            const testKeys = Object.keys(suite.tests);
            testKeys.forEach((testCode, index) => {
                const neighbourTestKeys = {prevTest: index>0 ? testKeys[index-1]:null, nextTest: index<testKeys.length-1 ? testKeys[index+1]:null};
                const test = suite.tests[testCode];
                const htmlContentTest = testGenerator.createDocument(test, suite, neighbourTestKeys);
                reportFileUtils.writeHTML(htmlContentTest, reportFileUtils.reportFolder(), reportFileUtils.testFileName(suiteCode, testCode));
            });
        });
    }
};
