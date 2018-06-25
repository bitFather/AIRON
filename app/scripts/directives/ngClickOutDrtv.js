'use strict';
var ngClickOut = function($window,$parse) {
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {
            var fn = $parse(attr.ngClickOut);
            var elemClickHandler = function(e) {
                e.stopPropagation();
            };

            var docClickHandler = function() {
                scope.$apply(() => {
                    fn(scope)
                });
            };

            elem.on('click', elemClickHandler);
            angular.element($window).on('click', docClickHandler);

            // teardown the event handlers when the scope is destroyed.
            scope.$on('$destroy', function() {
                elem.off('click', elemClickHandler);
                angular.element($window).off('click', docClickHandler);
            });
        }
    }
};
module.exports = ngClickOut;