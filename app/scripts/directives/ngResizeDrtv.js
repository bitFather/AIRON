'use strict';
var ngResize = function($window,$parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            var fn = $parse(attr.ngResize);

            var docResizeHandler = function() {
                scope.$apply(() => {
                    fn(scope)
                });
            };
            angular.element($window).on('resize', docResizeHandler);
        }
    }
};
module.exports = ngResize;