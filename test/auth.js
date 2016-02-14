describe('Authentication methods', function () {
    it('header', function () {
        var auth = require('../js/auth');
        var header = auth('user', '123456', '654321', {timestamp: '1455392374787', nonce: '67418958'});
        expect(header['harbinger-authentication'])
          .toEqual('apikey=123456;timestamp=1455392374787;nonce=67418958;signature=62042cb7b3cdb5edc11127d79ec0186fb2673b6b');
    });
    it('provided nonce', function () {
        var auth = require('../js/auth');
        var header = auth('user', '123456', '654321', {nonce: '12345678'});
        expect(header['harbinger-authentication']).toMatch(/nonce=12345678/);
    });
    it('provided timestamp', function () {
        var auth = require('../js/auth');
        var header = auth('user', '123456', '654321', {timestamp: new Date('1980-01-01')});
        expect(header['harbinger-authentication']).toMatch(/timestamp=315532800000/);
    });
    it('no option object', function () {
        var auth = require('../js/auth');
        var header = auth('user', '123456', '654321');
        expect(header['harbinger-authentication']).toMatch(/;timestamp=\d+;/);
        expect(header['harbinger-authentication']).toMatch(/;nonce=\d+;/);
        expect(header['harbinger-authentication']).toMatch(/^apikey=123456;/);
        expect(header['harbinger-authentication']).toMatch(/;signature=[0-9a-f]+$/);
    });
});
