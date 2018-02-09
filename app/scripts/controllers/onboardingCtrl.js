'use strict';
var onboardingCtrl = function($scope, globalService, $translate, $sce) {

    $scope.onboardModal     = document.getElementById('onboardingModal') ? new Modal(document.getElementById('onboardingModal')) : null

    // if there is onboardStatus in localStorage....
    if ( globalFuncs.localStorage.getItem("onboardStatus", null) != null ) {
        $scope.onboardModal.open()
    }

    // whenever a user clicks a button on the modal...
    $scope.clickButton = function( ) {                                           // show the slide indicated
        globalFuncs.localStorage.setItem("onboardStatus", 1)
        $scope.onboardModal.close()
    }

}
module.exports = onboardingCtrl;
