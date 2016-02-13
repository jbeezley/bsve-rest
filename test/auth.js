describe('Authentication methods', function () {
    it('header', function () {
        var auth = require('../js/auth');
        var header = auth('user', '123456', '654321', {timestamp: '1455392374787', nonce: '67418958'});
        expect(header['harbinger-authentication'])
          .toEqual('apikey=123456;timestamp=1455392374787;nonce=67418958;signature=62042cb7b3cdb5edc11127d79ec0186fb2673b6b');
    });
});
