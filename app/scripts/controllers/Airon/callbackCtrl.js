'use strict';
var callbackCtrl = function (authService) {
    authService.handleAuthentication();
}

module.exports = callbackCtrl;