'use strict';

describe('The main view', function () {

    beforeEach(function () {
        browser.get('http://localhost:3000/index.html');
    });

    // 当console 出现 error 时, 报错
    afterEach(function() {
        browser.manage().logs().get('browser').then(function(browserLog) {
            expect(browserLog.length).toEqual(0);
        });
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('My App');
    });

});

