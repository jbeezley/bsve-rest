require('../app/index');
var $ = require('jquery');

describe('Main application', function () {
    beforeEach(function (done) {
        function wait() {
            if ($('.b-app-generate-auth').length > 0) {
                done();
            } else {
                window.setTimeout(wait, 50);
            }
        }
        wait();
    });
    it('has navbar', function () {
        expect($('.navbar').length > 0).toBe(true);
    });
    it('generate auth header', function () {
        var initial = 'Fill in the fields above.';
        $('#b-app-user').val('user@example.com').change();
        expect($('#b-app-auth-header').val()).toBe(initial);
        $('#b-app-apikey').val('123456').change();
        expect($('#b-app-auth-header').val()).toBe(initial);
        $('#b-app-secretkey').val('654321').change();
        expect($('#b-app-auth-header').val()).toMatch(/apikey=123456;timestamp=\d+;nonce=\d+;signature=[0-9a-f]+/);
    });
});
