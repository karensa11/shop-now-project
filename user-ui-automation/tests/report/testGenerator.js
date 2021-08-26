const fileUtils = require('../lib/fileUtils');
const htmlUtils = require('./htmlUtils');
const reportFileUtils = require('./reportFileUtils');
const presentationUtils = require('./presentationUtils');

module.exports = {
    createDocument(test, suite, neighbourTestKeys) {
        const htmlContent = [
            this.createDocumentHeader(test),
            this.createBody(test, suite, neighbourTestKeys)
        ];
        return htmlContent;
    },
    createDocumentHeader(test) {
        const htmlContent = {
            type: 'head',
            content: [
                {
                    type: 'title', content: test.testName
                },
                {
                    type: 'link', attributes: {rel: 'stylesheet', href: 'styles.css'}
                }
            ]
        };
        return htmlContent;
    },
    createBody(test, suite, neighbourTestKeys) {
        const body = {
            type: 'body',
            attributes: {style: 'padding: 1rem'},
            content: [
                this.createReportHeader(test, neighbourTestKeys, suite),
                htmlUtils.createBR(),
                htmlUtils.createA('Back To Index', reportFileUtils.mainFileName()),
                htmlUtils.createBR(),
                this.createReportGeneralDetails(test, suite),
                htmlUtils.createBR(),htmlUtils.createBR(),
                this.createTestDetailedLog(test)
            ]
        };
        return body;
    },
    createReportHeader(test, neighbourTestKeys, suite) {
        const result = {
            type: 'div',
            attributes: {class: 'pageTitle'},
            content: []
        };
        if(neighbourTestKeys.prevTest){
            result.content.push({
                type: 'a',
                attributes: {class: 'linkPrev', href: reportFileUtils.testFileName(suite.suiteCode, neighbourTestKeys.prevTest)},
                content: '&#x2039;'
            })
        }
        result.content.push({
            type: 'span',
            content: test.testName
        });
        if(neighbourTestKeys.nextTest){
            result.content.push({
                type: 'a',
                attributes: {class: 'linkNext', href: reportFileUtils.testFileName(suite.suiteCode, neighbourTestKeys.nextTest)},
                content: '&#x203A;'
            })
        }
        return result;
    },
    createReportGeneralDetails(test, suite) {
        return {
            type: 'table',
            attributes: {class: 'details', align: 'center'},
            content: [
                {
                    type: 'tr',
                    content: [
                        htmlUtils.createTD('Suite', 'detailsHeader'), htmlUtils.createTD(suite.suiteName),
                        htmlUtils.createTD('Start', 'detailsHeader'),
                        htmlUtils.createTD(presentationUtils.formatDate(test.startDate)),
                        htmlUtils.createTD('End', 'detailsHeader'),
                        htmlUtils.createTD(presentationUtils.formatDate(test.endDate)),
                        htmlUtils.createTD('Status', 'detailsHeader'),
                        htmlUtils.createTD(test.isPassed ? 'PASS' : 'FAIL', test.isPassed ? 'pass' : 'fail'),
                    ]
                }
            ]
        }
    },
    createTestDetailedLog(test) {
        const result = {
            type: 'div',
            attributes: {class: 'testDetails'},
            content: []
        };

        const lines = fileUtils.getAllLines(reportFileUtils.logFile(test.testCode));

        lines.forEach(line => {
            if(line.includes('IMAGE')){
                const imageId = line.substr(line.indexOf('IMAGE')+6);
                result.content.push({
                    type: 'div',
                    content: [{
                        type: 'img',
                        attributes: {class: 'screenshot', src: reportFileUtils.imageFile(imageId)}
                    }]
                });
            }
            else {
                result.content.push({
                    type: 'div',
                    attributes: {class: 'text'},
                    content: line
                });
            }
        });
        if(test.error){
            result.content.push({
                type: 'div',
                attributes: {class: 'error'},
                content: test.error
            });
        }

        return result;
    }
};
