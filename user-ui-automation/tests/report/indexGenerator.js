const htmlUtils = require('./htmlUtils');
const reportFileUtils = require('./reportFileUtils');
const presentationUtils = require('./presentationUtils');

module.exports = {
    createDocument(runInfo) {
        const htmlContent = [
            this.createDocumentHeader(),
            this.createBody(runInfo)
        ];
        return htmlContent;
    },
    createDocumentHeader() {
        return {
            type: 'head',
            content: [
                htmlUtils.createTitle('Automation Report'),
                htmlUtils.createCSS('styles.css')
            ]
        };
    },
    createBody(runInfo) {
        const body = {
            type: 'body',
            content: [
                this.createReportHeader(),
                {
                    type: 'div',
                    attributes: {id: 'divContent'},
                    content: [
                        htmlUtils.createBR(), htmlUtils.createBR(),
                        this.createReportGeneralDetails(runInfo),
                        htmlUtils.createBR(), htmlUtils.createBR(),
                        this.createSuites(runInfo)
                    ]
                }
            ]
        };
        return body;
    },
    createReportHeader() {
        return {
            type: 'div',
            attributes: {class: 'pageTitle', align: 'center'},
            content: [
                {
                    type: 'div',
                    attributes: {class: 'pageTitleMain', align: 'center'},
                    content: 'SHOP TESTING'
                },
                {
                    type: 'div',
                    attributes: {class: 'currentPage', align: 'center'},
                    content: 'OVERVIEW'
                }]
        }
    },
    createReportGeneralDetails(runInfo) {
        const suite = Object.values(runInfo.suites)[0];
        return {
            type: 'div',
            attributes: {align: 'center'},
            content: [{
                type: 'table',
                content: [
                    {
                        type: 'tr',
                        content: [
                            htmlUtils.createTD('Browser', 'detailsHeader'),
                            htmlUtils.createTD('chrome'),
                        ]
                    },
                    {
                        type: 'tr',
                        content: [
                            htmlUtils.createTD('Start', 'detailsHeader'),
                            htmlUtils.createTD(presentationUtils.formatDate(suite.startDate)),
                        ]
                    },
                    {
                        type: 'tr',
                        content: [
                            htmlUtils.createTD('End', 'detailsHeader'),
                            htmlUtils.createTD(presentationUtils.formatDate(suite.endDate)),
                        ]
                    },
                    {
                        type: 'tr',
                        content: [
                            htmlUtils.createTD('Duration (S)', 'detailsHeader'),
                            htmlUtils.createTD(presentationUtils.formatDuration(suite.duration)),
                        ]
                    },
                    {
                        type: 'tr',
                        content: [
                            htmlUtils.createTD('Passed Tests', 'detailsHeader'),
                            htmlUtils.createTD(suite.passedTests + '/' + suite.testsNum),
                        ]
                    },
                    {
                        type: 'tr',
                        content: [
                            htmlUtils.createTD('Passed Steps', 'detailsHeader'),
                            htmlUtils.createTD(suite.passedSteps + '/' + suite.totalSteps),
                        ]
                    },
                    {
                        type: 'tr',
                        content: [
                            htmlUtils.createTD('Session ID', 'detailsHeader'),
                            htmlUtils.createTD(runInfo.sessionId)
                        ]
                    }
                ]
            }]
        }
    },
    createSuites(runInfo) {
        const result = {
            type: 'div',
            attributes: {align: 'center'},
            content: []
        };
        Object.values(runInfo.suites).forEach(suite => {
            result.content.push(this.createTests(suite));
        });
        return result;
    },
    createTests(suite) {
        const result = {
            type: 'table',
            attributes: {class: 'detailsTable'},
            content: [{
                type: 'tr',
                attributes: {class: 'tableTitle'},
                content: [
                    htmlUtils.createTH('Test Name'),
                    htmlUtils.createTH('Status'),
                    htmlUtils.createTH('Start Time'),
                    htmlUtils.createTH('End Time'),
                    htmlUtils.createTH('Duration (s)'),
                    htmlUtils.createTH('Passed'),,
                    htmlUtils.createTH('Failed Step'),
                ]
            }]
        }
        Object.values(suite.tests).forEach(test => {
            result.content.push(
                {
                    type: 'tr',
                    content: [
                        {
                            type: 'td',
                            attributes: {class: 'testName'},
                            content: [
                                htmlUtils.createA(test.testName, reportFileUtils.testFileName(suite.suiteCode, test.testCode))
                            ]
                        },
                        htmlUtils.createTD(test.isPassed ? 'PASS' : 'FAIL', test.isPassed ? 'pass' : 'fail'),
                        htmlUtils.createTD(presentationUtils.formatDate(test.startDate)),
                        htmlUtils.createTD(presentationUtils.formatDate(test.endDate)),
                        htmlUtils.createTD(presentationUtils.formatDuration(test.duration)),
                        htmlUtils.createTD(test.stepsPassed + " / " + test.totalSteps),
                        htmlUtils.createTD(test.failedStep),
                    ]
                })
        });
        return result;
    }
}