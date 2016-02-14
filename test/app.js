require('../app/index');
var $ = require('jquery');

describe('Main application', function () {
    it('has navbar', function () {
        expect($('.navbar').length > 0).toBe(true);
    });
});
