'use strict';
var callbackCtrl = function (authService) {
    authService.handleAuthentication();

    window.location = '/'
}

module.exports = callbackCtrl;