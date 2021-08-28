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
                {
                    type: 'title', content: 'Automation Report'
                },
                {
                    type: 'link', attributes: {rel: 'stylesheet', href: 'styles.css'}
                }
            ]
        };
    },
    createBody(runInfo) {
        const body = {
            type: 'body',
            attributes: {style: 'padding: 1rem'},
            content: [
                this.createReportHeader(),
                htmlUtils.createBR(),htmlUtils.createBR(),
                this.createReportGeneralDetails(runInfo),
                htmlUtils.createBR(),htmlUtils.createBR(),
                this.createSuites(runInfo)
            ]
        };
        return body;
    },
    createReportHeader() {
        return {
            type: 'div',
            attributes: {class: 'pageTitle'},
            content: 'TEST RUN'
        }
    },
    createReportGeneralDetails(runInfo) {
        const suite = Object.values(runInfo.suites)[0];
        return {
            type: 'table',
            attributes: {class: 'details', align: 'center'},
            content: [
                {
                    type: 'tr',
                    content: [
                        htmlUtils.createTD('Browser', 'detailsHeader'),
                        htmlUtils.createTD('chrome'),
                        htmlUtils.createTD('Start', 'detailsHeader'),
                        htmlUtils.createTD(presentationUtils.formatDate(suite.startDate)),
                        htmlUtils.createTD('End', 'detailsHeader'),
                        htmlUtils.createTD(presentationUtils.formatDate(suite.endDate)),
                        htmlUtils.createTD('Duration (S)', 'detailsHeader'),
                        htmlUtils.createTD(presentationUtils.formatDuration(suite.duration)),
                        htmlUtils.createTD('Passed', 'detailsHeader'),
                        htmlUtils.createTD(suite.passedTests+'/'+suite.testsNum),
                        htmlUtils.createTD('Session ID', 'detailsHeader'),
                        htmlUtils.createTD(runInfo.sessionId)
                    ]
                }
            ]
        }
    },
    createSuites(runInfo) {
        const result = {
            type: 'div',
            attributes: {align: 'center'},
            content: []
        }
        Object.values(runInfo.suites).forEach(suite => {
            result.content.push(this.createTests(suite));
        });
        return result;
    },
    createTests(suite) {
        const result = {
            type: 'table',
            attributes: {class: 'details'},
            content: [{
                type: 'tr',
                content: [
                    htmlUtils.createTH('Test Name'),
                    htmlUtils.createTH('Status'),
                    htmlUtils.createTH('Start Time'),
                    htmlUtils.createTH('End Time'),
                    htmlUtils.createTH('Duration (s)'),
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
                    ]
                })
        });
        return result;
    }
}