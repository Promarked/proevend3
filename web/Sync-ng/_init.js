/**
 * Created by Promarked on 26/07/2017.
 */
var ngapp = angular.module("ngapp",["ngRoute", 'ngSanitize']);

ngapp.directive('ngRightClick', function($parse) {

    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});