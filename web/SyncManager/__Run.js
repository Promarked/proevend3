/**
 * Created by Promarked on 3/04/2017.
 */



/**Controladores*/
app.controller('MainController', function ($scope, $routeParams, $http, $rootScope) {
    $scope.$broadcast("$locationChangeStart");
    $rootScope.page = {};
    $rootScope.page.title = "Main";
    $rootScope.page.subtitle = "Pagina de ejecucion inicial";
    $rootScope.statusLoading = 1;
});
