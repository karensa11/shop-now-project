const fileUtils = require('../lib/fileUtils');
const htmlUtils = require('./htmlUtils');
const reportFileUtils = require('./reportFileUtils');
const presentationUtils = require('./presentationUtils');
const logger = require('../utils/logUtils');
const stringUtils = require('../lib/stringUtils');

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
                htmlUtils.createTitle(test.testName),
                htmlUtils.createCSS("styles.css"),
                htmlUtils.createCSS("modal.css"),
                htmlUtils.createScript("jquery.min.js"),
                htmlUtils.createScript("modal.js"),
                htmlUtils.createScript("scripts.js")
            ]
        };
        return htmlContent;
    },
    createBody(test, suite, neighbourTestKeys) {
        const body = {
            type: 'body',
            attributes: {style: 'padding: 1rem'},
            content: [
                this.createReportHeader(test),
                {
                    type: 'div',
                    attributes: {id: 'divContent'},
                    content: [
                        htmlUtils.createCenteredDiv(this.createTestsOptions(test, neighbourTestKeys, suite)),
                        htmlUtils.createBR(), htmlUtils.createBR(),
                        htmlUtils.createCenteredDiv(this.createTestKeysStatus(test, suite)),
                        htmlUtils.createBR(), htmlUtils.createBR(),
                        htmlUtils.createCenteredDiv(this.createError(test)),
                    ]
                }
            ]
        };
        return body;
    },
    createReportHeader(test) {
        return {
            type: 'div',
            attributes: {class: 'pageTitle'},
            content: [
                {
                    type: 'div',
                    attributes: {class: 'pageTitleMain', align: 'center'},
                    content: 'SHOP TESTING'
                },
                {
                    type: 'div',
                    attributes: {class: 'currentPage', align: 'center'},
                    content: test.testName,
                },
            ]
        }
    },
    createTestKeysStatus(test) {
        const result = {
            type: 'table',
            attributes: {class: 'detailsTable'},
            content: [{
                type: 'tr',
                attributes: {class: 'tableTitle'},
                content: [
                    htmlUtils.createTH('Steps (' + Object.keys(test.stepsData).length + ')'),
                    htmlUtils.createTH('Status'),
                    htmlUtils.createTH('Start Date'),
                    htmlUtils.createTH('Duration (s)'),
                ]
            }]
        };
        Object.keys(test.stepsData).forEach(stepKey => {
            const stepData = test.stepsData[stepKey];
            const durationFormatted =
                stepData.duration ? presentationUtils.formatDuration(stepData.duration) : "";
            const keyLink = stepData !== "SKIPPED" ?
                "#" + stringUtils.removeSpaces(stepKey) : "";
            const keyElement = keyLink ?
                [htmlUtils.createA(stepKey, keyLink)] : stepKey;
            const stepId = stringUtils.removeSpaces(stepKey);
            result.content.push({
                type: 'tr',
                attributes: {onclick: 'toggleElement(\''+stepId+'\');'},
                content: [
                    htmlUtils.createTD(keyElement, 'testName'),
                    htmlUtils.createTD(stepData.status, 'test-key-status test-key-status-'+stepData.status),
                    htmlUtils.createTD(stepData.startDate),
                    htmlUtils.createTD(durationFormatted),
                ]
            });
            result.content.push(this.createStepLogEntries(test, stepKey));
        });

        return result;
    },
    createStepLogEntries(test, stepKey) {
        const stepId = stringUtils.removeSpaces(stepKey);
        const result = {
            type: 'tr',
            attributes: {class: 'totalRow  passedRow '},
            content: [{
                type: 'td',
                attributes: {class: 'messagesCol', colspan: '4'},
                content: [{
                    type: 'div',
                    attributes: {class: 'messageContainer', id: stepId, align: 'center', style: 'display:none'},
                    content: [{
                        type: 'table',
                        attributes: {class: 'messages'},
                        content: [{
                            type: 'tr',
                            content: [{
                                type: 'td',
                                content: [{
                                    type: 'div',
                                    attributes: {class: 'divMessage'},
                                    content: []
                                }]
                            }]
                        }]
                    }]
                }]
            }]
        };
        const container = result.content[0].content[0].content[0].content[0].content[0].content[0].content;
        test.logEntries[stepKey].forEach(line => {
            if(line.includes(logger.logEntries.IMAGE)){
                const imageId = line.substr(line.indexOf(logger.logEntries.IMAGE)+6);
                const imagePath = reportFileUtils.imageFileSrc(imageId);
                container.push(htmlUtils.createCenteredDiv({
                    type: 'img',
                    attributes: {
                        class: 'screenshot',
                        src: imagePath,
                        onclick: "openImageModal(event, '" + imagePath + "');"
                    }
                }));
            } else if (line.includes(logger.logEntries.TITLE)) {
                const title = line.substr(6);
                container.push({
                    type: 'div',
                    attributes: {
                        class: 'test-section-title',
                        id: stringUtils.removeSpaces(title)
                    },
                    content: [
                        htmlUtils.createSpan(title),
                        htmlUtils.createA("top", "#title", 'title-top-link')
                    ]
                });
            } else {
                container.push(htmlUtils.createSimpleTextDiv(line, 'text'));
            }
        });
        return result;
    },
    createTestsOptions(test, neighbourTestKeys, suite) {
        const result = {
            type: 'div',
            content: []
        };
        result.content.push({
            type: 'button',
            attributes: {id: 'showContent', onclick: "$('#showContent').hide();$('#hideContent').show();showAllElementStartsWith('messageContainer')"},
            content: ' + expand all'
        });
        result.content.push({
            type: 'button',
            attributes: {id: 'hideContent', style: 'display: none', onclick: "$('#hideContent').hide();$('#showContent').show();hideAllElementStartsWith('messageContainer')"},
            content: ' + collapse all'
        });
        result.content.push(htmlUtils.createA('&#171; tests index&nbsp;&nbsp;&nbsp;', reportFileUtils.mainFileName(), 'link-arrow'));
        if (neighbourTestKeys.prevTest) {
            result.content.push(htmlUtils.createA('&#x2039;&nbsp;' + neighbourTestKeys.prevTest + '&nbsp;&nbsp;&nbsp;&nbsp;', reportFileUtils.testFileName(suite.suiteCode, neighbourTestKeys.prevTest), 'link-arrow'));
        }
        result.content.push(htmlUtils.createCheckbox('showImages', "showHide('screenshot', 'showImages')", true));
        result.content.push(htmlUtils.createSpan('Show Images', 'checkbox-label'));
        result.content.push(htmlUtils.createCheckbox('showMessages', "showHide('text', 'showMessages')", true));
        result.content.push(htmlUtils.createSpan('Show Messages', 'checkbox-label'));
        if (neighbourTestKeys.nextTest) {
            result.content.push(htmlUtils.createA(neighbourTestKeys.nextTest + '&nbsp;&#x203A;', reportFileUtils.testFileName(suite.suiteCode, neighbourTestKeys.nextTest), 'link-arrow'));
        }
        return result;
    },
    createError(test) {
        const result = {
            type: 'div',
            attributes: {class: 'test-details'},
            content: []
        };
        if(test.error){
            result.content.push(htmlUtils.createSimpleTextDiv(test.error, 'error'));
        }
        return result;
    }
};
