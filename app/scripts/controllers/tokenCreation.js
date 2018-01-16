'use strict';
var tokenCreationCtrl = function($scope) {
    $scope.ajaxReq = ajaxReq;
    $scope.Validator = Validator;
    $scope.unitReadable = 'reiss1';
    $scope.dropdownEnabled = true;

    $scope.dropItems = [
        'reiss1',
        'reiss2',
        'reiss3',
        'reiss4',
    ]

    $scope.token = {
        name: '',
        description: '',
        totalCount: '',
        countType: '0',
        decimals: '',
    }

    $scope.setCountMode = function(index, countType) {
        $scope.countType = index;
        $scope.unitReadable = countType;
        $scope.dropdownAmount = false;
    }
    $scope.generateToken = function () {
        
    }
}
module.exports = tokenCreationCtrl;
