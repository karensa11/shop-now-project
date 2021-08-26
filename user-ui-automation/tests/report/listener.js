const reportGenerator = require('./reportGenerator');
const stringUtils = require('../lib/stringUtils');
const dateFormat = require('dateformat');

const RunnerEvents = {
    EVENT_RUN_BEGIN: 'start',
    EVENT_RUN_END: 'end',
    EVENT_TEST_FAIL: 'fail',
    EVENT_TEST_PENDING: 'pending',
    EVENT_TEST_PASS: 'pass',
    EVENT_SUITE_BEGIN: 'suite',
    EVENT_SUITE_END: 'suite end',
};
function dateForTestsMinusDuration(duration){
    const newDate = new Date().setTime(new Date().getTime()-duration);
    return newDate;
}
function dateForTests(){
    return new Date();
}

class MyReporter {
    constructor(runner) {
        this.runInfo = {};

        runner
            .on(RunnerEvents.EVENT_RUN_BEGIN, () => {
                console.log('RUN STARTING');
                this.runInfo.startDate = dateForTests();
            })
            .on(RunnerEvents.EVENT_SUITE_BEGIN, (suite) => {
                console.log('SUITE '+suite.title+' RUNNING');
                this.pushSuite(suite);
            })
            .on(RunnerEvents.EVENT_SUITE_END, (suite) => {
                console.log('SUITE '+suite.title+' FINISHED');
                this.finishSuite(suite);
            })
            .on(RunnerEvents.EVENT_TEST_PENDING, (test) => {
                console.log('PENDING!!!!!!!!!!!!');
            })
            .on(RunnerEvents.EVENT_TEST_PASS, (test) => {
                console.log('TEST '+test.title+' PASSED');
                this.pushTest(test, true);
            })
            .on(RunnerEvents.EVENT_TEST_FAIL, (test, err) => {
                console.log('TEST '+test.title+' FAILED');
                this.pushTest(test, false, err);
            })
            .once(RunnerEvents.EVENT_RUN_END, () => {
                console.log('RUN FINISHED');
                this.runInfo.endDate = dateForTests();
                reportGenerator.createReport(this.runInfo);
            });
    }

    pushSuite(suite) {
        const suiteCode = stringUtils.toCammelCase(suite.title);
        if(stringUtils.stringNotEmpty(suiteCode)){
            if(!this.runInfo.suites){
                this.runInfo.suites = {};
            }
            this.runInfo.suites[suiteCode] = {
                suiteCode: suiteCode,
                suiteName: suite.title,
                tests: [],
                passedTests: 0,
                testsNum: 0,
                startDate: dateForTests()
            };
        }
    }

    finishSuite(suite) {
        const suiteCode = stringUtils.toCammelCase(suite.title);
        if(stringUtils.stringNotEmpty(suiteCode)){
            const suite = this.runInfo.suites[suiteCode];
            suite.endDate = dateForTests()
            suite.duration = suite.endDate.getTime()-suite.startDate.getTime();
        }
    }

    pushTest(test, isPassed, err) {
        const suiteCode = stringUtils.toCammelCase(test.parent.title);
        const testCode = stringUtils.toCammelCase(test.title);
        const suite = this.runInfo.suites[suiteCode];
        suite.tests[testCode] = {
            testName: test.title,
            testCode: testCode,
            isPassed: isPassed,
            endDate: dateForTests(),
            startDate: dateForTestsMinusDuration(test.duration),
            duration: test.duration,
            error: err
        };
        suite.testsNum++;
        isPassed && suite.passedTests++;
    }
}

module.exports = MyReporter;