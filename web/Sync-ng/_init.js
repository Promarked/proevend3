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

ngapp.directive('ngEnter', function($parse) {

    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngEnter);
        element.bind('keyup', function(event) {
            if(event.which === 13)
                scope.$apply(function() {
                    event.preventDefault();
                    fn(scope, {$event:event});
                });
        });
    };
});

/*ngapp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            console.
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});*/