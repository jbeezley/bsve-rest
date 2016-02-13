function generate_nonce() {
    return (Math.random() * 10e8).toFixed();
}

function generate_timestamp(date) {
    return (date || new Date()).valueOf().toString();
}

module.exports = function (user, apikey, secret, opts) {
    var JsSHA = require('jssha');
    var sha = new JsSHA('SHA-1', 'TEXT');

    opts = opts || {};

    var nonce = opts.nonce || generate_nonce();
    var timestamp = generate_timestamp(opts.timestamp);

    var key = [apikey, secret].join(':');
    var msg = [apikey, timestamp, nonce, user].join('');

    sha.setHMACKey(key, 'TEXT');
    sha.update(msg);
    var signature = sha.getHMAC('HEX');
    var parts = [
        'apikey=' + apikey,
        'timestamp=' + timestamp,
        'nonce=' + nonce,
        'signature=' + signature
    ];
    return {
        'harbinger-authentication': parts.join(';')
    };
};
