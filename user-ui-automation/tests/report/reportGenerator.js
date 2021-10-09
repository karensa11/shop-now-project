const indexGenerator = require('./indexGenerator');
const testGenerator = require('./testGenerator');
const fileUtils = require('../lib/fileUtils');
const reportFileUtils = require('./reportFileUtils');
const config = require('../../config');
const logger = require('../utils/logUtils');

module.exports = {
    createReport(runInfo) {
        this.copyFiles();
        this.analyzeLogs(runInfo);
        this.generateMainReport(runInfo);
        this.generateTestReport(runInfo);
    },
    copyFiles() {
        fileUtils.createDirectoryIfNotExists(reportFileUtils.reportFolder());
        fileUtils.copyFile(config.resourcesFolder + 'styles.css', reportFileUtils.reportFolder() + 'styles.css');
        fileUtils.copyFile(config.resourcesFolder + 'modal.css', reportFileUtils.reportFolder() + 'modal.css');
        fileUtils.copyFile(config.resourcesFolder + 'scripts.js', reportFileUtils.reportFolder() + 'scripts.js');
        fileUtils.copyFile(config.resourcesFolder + 'modal.js', reportFileUtils.reportFolder() + 'modal.js');
        fileUtils.copyFile(config.resourcesFolder + 'jquery.min.js', reportFileUtils.reportFolder() + 'jquery.min.js');
    },
    analyzeLogs(runInfo) {
        Object.keys(runInfo.suites).forEach((suiteCode) => {
            const suite = runInfo.suites[suiteCode];
            const testsCodes = Object.keys(suite.tests);
            suite.totalSteps = 0;
            suite.passedSteps = 0;
            testsCodes.forEach((testCode, index) => {
                const test = suite.tests[testCode];
                this.analyzeStepsStatus(suite, test, testCode);
                this.splitLogEntriesPerTest(test, testCode);
            });
        });
    },
    analyzeStepsStatus(suite, test, testCode) {
        const testStepsData = fileUtils.fileExists(reportFileUtils.keysFile(testCode)) ?
            fileUtils.getAllLines(reportFileUtils.keysFile(testCode)) : [];
        const testPartsKeysStatus = fileUtils.fileExists(reportFileUtils.keysStatusFile(testCode)) ?
            fileUtils.getAllLines(reportFileUtils.keysStatusFile(testCode)) : [];
        test.stepsData = {};
        test.stepsPassed = 0;
        test.totalSteps = 0;

        testStepsData.forEach(step => {
            if (step !== "") {
                suite.totalSteps++;
                test.totalSteps++;
                const keyStatus = testPartsKeysStatus.filter(item =>
                    item.includes(step)
                );
                const startDate = keyStatus && keyStatus.length ?
                    keyStatus[0].substr(keyStatus[0].indexOf(" DATE ") + 6, 19) : "";
                const duration = keyStatus && keyStatus.length ?
                    parseInt(keyStatus[0].substr(keyStatus[0].indexOf(" DURATION ") + 11)) : null;
                const status = keyStatus && keyStatus.length ?
                    ((keyStatus[0]).includes("SUCCESS") ?
                        "SUCCESS" : "FAILURE") : "SKIPPED";
                if (status === "SUCCESS"){
                    test.stepsPassed++;
                    suite.passedSteps++;
                }
                status === "FAILURE" && (test.failedStep = step);
                test.stepsData[step] = {
                    status: status,
                    startDate: startDate,
                    duration: duration
                };
            }
        });
    },
    splitLogEntriesPerTest(test, testCode) {
        const testStepsLogEntries = fileUtils.fileExists(reportFileUtils.logFile(testCode)) ?
            fileUtils.getAllLines(reportFileUtils.logFile(testCode)) : [];
        let currentStep = null;
        test.logEntries = {};
        testStepsLogEntries.forEach(logEntry => {
            if (logEntry.includes(logger.logEntries.TITLE)) {
                currentStep = logEntry.substr(6);
                test.logEntries[currentStep] = [];
            } else {
                test.logEntries[currentStep].push(logEntry);
            }
        });
    },
    generateMainReport(runInfo) {
        const htmlContent = indexGenerator.createDocument(runInfo);
        reportFileUtils.writeHTML(htmlContent, reportFileUtils.reportFolder(), reportFileUtils.mainFileName());
    },
    generateTestReport(runInfo) {
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
