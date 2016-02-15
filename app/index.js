var $ = require('jquery');
var Clipboard = require('clipboard');

require('./index.css');

var auth = require('../js/auth');

function generate() {
    var user = $('#b-app-user').val();
    var apikey = $('#b-app-apikey').val();
    var secret = $('#b-app-secretkey').val();
    var value = 'Fill in the fields above.';

    if (user && apikey && secret) {
        value = auth(user, apikey, secret)['harbinger-authentication'];
    }
    $('#b-app-auth-header').val(value);
}
$(function () {
    $('<div class="b-app-content"/>').html(require('./body.jade')).appendTo('body');
    $('[data-toggle="tooltip"]').tooltip();
    $('.b-app-generate-auth .form-group input').change(generate);
    new Clipboard('.b-app-copy-button'); // eslint-disable-line no-new
});
